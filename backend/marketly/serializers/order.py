from django.core import exceptions
from rest_framework import serializers
from marketly.models import Order, OrderStatus, Product


class OrderSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    buyer = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Order
        fields = "__all__"

    def update(self, instance, validated_data):
        status = validated_data.get("status", None)

        if status == OrderStatus.PENDING:
            raise exceptions.PermissionDenied(
                "Cannot update order with status 'Incart'"
            )

        if status == OrderStatus.INCART:
            raise exceptions.PermissionDenied(
                "Cannot update order with status 'Incart'"
            )

        instance = super().update(instance, validated_data)
        return instance
