from rest_framework import serializers
from marketly.models import Review, Product
from django.db.models import Sum
import math


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = Review
        fields = "__all__"

    def create(self, validated_data):
        review_instance = super().create(validated_data)
        product_id = validated_data.get("product").id

        product = Product.objects.get(id=product_id)
        reviews = Review.objects.filter(product=product)
        total_rating = Review.objects.aggregate(Sum("rating"))["rating__sum"]
        num_reviews = reviews.count()

        if num_reviews > 0:
            product.rating = math.floor(total_rating / num_reviews)

        else:
            product.rating = 0
        product.save()

        return review_instance
