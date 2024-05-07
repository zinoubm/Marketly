from rest_framework import serializers
from marketly.models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
        read_only_fields = ["seller", "is_approved"]

    def create(self, validated_data):
        if validated_data["seller"].is_verified == True:
            validated_data["is_approved"] = True

        return Product.objects.create(**validated_data)
