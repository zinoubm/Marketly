from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

from marketly.models import Order, OrderStatus
from marketly.serializers import OrderSerializer


class OrderCreateAPIView(generics.CreateAPIView):
    queryset = Order.objects.all()
    permission_classes = [permissions.IsAuthenticated]

    serializer_class = OrderSerializer


class BuyerOrderListAPIView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(buyer=self.request.user).exclude(
            status=OrderStatus.INCART
        )


class SellerOrderListAPIView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(product__seller=self.request.user).exclude(
            status=OrderStatus.INCART
        )


class OrderRetrieveView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = OrderSerializer

    def get_queryset(self):
        return Order.objects.all()

    def get_object(self):
        queryset = self.get_queryset()
        obj = generics.get_object_or_404(queryset, pk=self.kwargs.get("pk"))

        if obj.buyer == self.request.user:
            return obj

        if obj.product.seller == self.request.user and obj.status != OrderStatus.INCART:
            return obj

        self.permission_denied(self.request)
