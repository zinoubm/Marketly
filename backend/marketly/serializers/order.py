from rest_framework import serializers
from marketly.models import Order, OrderStatus, Product
from authentication.models import User
from marketly.serializers import ProductSerializer


class OrderSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    buyer = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Order
        fields = "__all__"
        read_only_fields = ["status"]
