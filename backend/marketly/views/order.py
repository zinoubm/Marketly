from rest_framework import generics, permissions, serializers, status
from rest_framework.views import APIView
from rest_framework.response import Response

from marketly.models import Order, OrderStatus
from marketly.serializers import OrderSerializer


class OrderCreateAPIView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    queryset = Order.objects.all()

    def perform_create(self, serializer):
        serializer.save(buyer=self.request.user, status=OrderStatus.PENDING)

        if serializer.instance.product.inventory < serializer.instance.quantity:
            raise serializers.ValidationError(
                "Not enough items available for this product!"
            )

        serializer.instance.product.inventory -= serializer.instance.quantity
        serializer.instance.product.save()


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
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

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


# don't allow everyone to update orders
class OrderUpdateAPIView(generics.UpdateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(product__seller=self.request.user).exclude(
            status=OrderStatus.INCART
        )
