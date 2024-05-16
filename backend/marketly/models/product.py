from django.db import models
from django.conf import settings
from authentication.models import User
from marketly.models import Category
import stripe

stripe.api_key = settings.STRIPE_SECRET_KEY


class Product(models.Model):
    stripe_product_id = models.CharField(max_length=255, blank=True, null=True)
    stripe_price_id = models.CharField(max_length=255, blank=True, null=True)
    seller = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    price = models.PositiveIntegerField(default=5)
    is_approved = models.BooleanField(default=False)
    inventory = models.PositiveIntegerField(default=0)
    product_image = models.ImageField(upload_to="images/", blank=True)

    @property
    def in_stock(self):
        if self.inventory > 0:
            return True

        return False

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.title:
            self.stripe_product_id = stripe.Product.create(name=self.title).id

        if self.stripe_product_id:
            self.stripe_price_id = stripe.Price.create(
                product=self.stripe_product_id,
                unit_amount=self.price * 100,
                currency="usd",
            ).id

        super().save(*args, **kwargs)
