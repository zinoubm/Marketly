from rest_framework import serializers
from marketly.serializers import OrderSerializer
from marketly.models import Cart


class CartSerializer(serializers.ModelSerializer):
    orders = OrderSerializer(many=True)

    class Meta:
        model = Cart
        fields = ["user", "orders"]
