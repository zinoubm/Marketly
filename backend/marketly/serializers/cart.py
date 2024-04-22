from rest_framework import serializers
from marketly.serializers import OrderSerializer
from marketly.models import Cart


# todo
# remove this
class CartSerializer(serializers.ModelSerializer):
    orders = OrderSerializer(many=True)

    class Meta:
        model = Cart
        fields = ["user", "orders"]
