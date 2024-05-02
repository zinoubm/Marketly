from django.db import models
from authentication.models import User
from marketly.models import Category


class Product(models.Model):
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
