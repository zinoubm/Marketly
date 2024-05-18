from rest_framework import serializers
from marketly.serializers import ReviewSerializer
from marketly.models import Product, Review


class ProductSerializer(serializers.ModelSerializer):
    # reviews = ReviewSerializer(many=True, read_only=True)
    reviews = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = "__all__"
        read_only_fields = ["seller", "is_approved"]

    def get_reviews(self, obj):
        reviews_qs = Review.objects.filter(product=obj)
        reviews_serializer = ReviewSerializer(instance=reviews_qs, many=True)
        return reviews_serializer.data

    def create(self, validated_data):
        if validated_data["seller"].is_verified == True:
            validated_data["is_approved"] = True

        return Product.objects.create(**validated_data)
