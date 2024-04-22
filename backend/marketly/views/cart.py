from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from marketly.models import Order, OrderStatus
from marketly.serializers import OrderSerializer


class CartListCreateAPIView(generics.ListCreateAPIView):
    queryset = Order.objects.filter(status=OrderStatus.INCART)
    serializer_class = OrderSerializer

    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(status=OrderStatus.INCART)

class CartRemoveAPIView(generics.DestroyAPIView):
    queryset = Order.objects.filter(status=OrderStatus.INCART)
    serializer_class = OrderSerializer

    permission_classes = [permissions.IsAuthenticated]