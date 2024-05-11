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
        # read_only_fields = ["status"]

    def create(self, validated_data):
        request = self.context.get("request")

        product = validated_data.get("product")
        quantity = validated_data.get("quantity")

        if product.inventory < quantity:
            raise serializers.ValidationError(
                "Not enough items available for this product!"
            )

        order = Order.objects.create(
            buyer=request.user,
            product=product,
            quantity=quantity,
        )

        # decrese Inventory
        if order.status != OrderStatus.INCART:
            product_instance = Product.objects.get(pk=product.id)
            inventory = product_instance.inventory
            product_instance.inventory = inventory - quantity

            product_instance.save()

        return order

    # def update(self, instance, validated_data):
    #     instance.status = validated_data.get("status", instance.status)

    #     instance.save()
    #     return instance
