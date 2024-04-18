from rest_framework import serializers
from marketly.models import Order, OrderStatus, Product
from marketly.serializers import ProductSerializer


class OrderSerializer(serializers.ModelSerializer):
    products = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Product.objects.all()
    )

    class Meta:
        model = Order
        fields = "__all__"
        read_only_fields = ["status"]

    def create(self, validated_data):
        products_data = validated_data.pop("products", [])
        order = Order.objects.create(**validated_data)
        order.products.set(products_data)

        return order
