from rest_framework import generics, permissions, serializers, status
from rest_framework.response import Response
from django.conf import settings
from marketly.models import Order, OrderStatus
from marketly.serializers import OrderSerializer

import stripe


class OrderCreateAPIView(generics.CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    queryset = Order.objects.all()

    def perform_create(self, serializer):
        self.order_instance = serializer.save(
            buyer=self.request.user, status=OrderStatus.PENDING
        )

        if self.order_instance.product.inventory < self.order_instance.quantity:
            raise serializers.ValidationError(
                "Not enough items available for this product!"
            )

        self.order_instance.product.inventory -= self.order_instance.quantity
        self.order_instance.product.save()

    def post(self, *args, **kwargs):
        super().post(*args, **kwargs)
        try:
            stripe.api_key = settings.STRIPE_SECRET_KEY
            checkout_session = stripe.checkout.Session.create(
                line_items=[
                    {
                        "price": self.order_instance.product.stripe_price_id,
                        "quantity": self.order_instance.quantity,
                    },
                ],
                mode="payment",
                success_url=settings.FRONTEND_DOMAIN + "/payment-succeded",
                cancel_url=settings.FRONTEND_DOMAIN + "/payment-failed",
            )

            serialized_order = OrderSerializer(self.order_instance).data
            return Response(
                {
                    "status": "succeeded",
                    "checkout_session_url": checkout_session.url,
                    "order": serialized_order,
                },
                status=status.HTTP_201_CREATED,
            )

        except Exception as e:
            self.order_instance.delete()
            return Response(
                {"status": "failed"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


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
