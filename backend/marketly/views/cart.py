from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from marketly.models import Order, OrderStatus
from marketly.serializers import OrderSerializer


class CartListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(status=OrderStatus.INCART, buyer=self.request.user)

    def perform_create(self, serializer):
        serializer.save(status=OrderStatus.INCART)


class CartRemoveAPIView(generics.DestroyAPIView):
    queryset = Order.objects.filter(status=OrderStatus.INCART)
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]


# todo
# implement stripe checkout flow
class OrderFromCartAPIView(APIView):
    """
    Converts Orders with status eqaul to INCART to status equal to PENDING which Semantically match
    making orders from the Cart
    """

    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        in_cart_orders = Order.objects.filter(
            buyer=request.user, status=OrderStatus.INCART
        )

        for order in in_cart_orders:
            order.status = OrderStatus.PENDING
            order.save()

        return Response("The seller Is currently orders.", status=status.HTTP_200_OK)
