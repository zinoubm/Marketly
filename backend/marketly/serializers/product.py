from rest_framework import serializers
from marketly.models import Product


class ProductSerializer(serializers.ModelSerializer):
    seller = serializers.ReadOnlyField(source="user.username")
    is_approved = serializers.ReadOnlyField()

    class Meta:
        model = Product
        fields = "__all__"
