from django.conf import settings
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from marketly.models import Order, OrderStatus
from marketly.serializers import OrderSerializer

import stripe


class CartListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(status=OrderStatus.INCART, buyer=self.request.user)

    def perform_create(self, serializer):
        serializer.save(buyer=self.request.user, status=OrderStatus.INCART)


class CartRemoveAPIView(generics.DestroyAPIView):
    queryset = Order.objects.filter(status=OrderStatus.INCART)
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]


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

        line_items = []

        for order in in_cart_orders:
            line_items.append(
                {
                    "price": order.product.stripe_price_id,
                    "quantity": order.quantity,
                }
            )
            order.status = OrderStatus.PENDING
            order.save()

        try:
            stripe.api_key = settings.STRIPE_SECRET_KEY
            checkout_session = stripe.checkout.Session.create(
                line_items=line_items,
                mode="payment",
                success_url=settings.FRONTEND_DOMAIN + "/payment-succeded",
                cancel_url=settings.FRONTEND_DOMAIN + "/payment-failed",
            )

            return Response(
                {
                    "status": "succeeded",
                    "checkout_session_url": checkout_session.url,
                },
                status=status.HTTP_201_CREATED,
            )

        except Exception as e:
            print(e)
            for order in in_cart_orders:
                order.status = OrderStatus.INCART
                order.save()

            return Response(
                {"status": "failed"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
