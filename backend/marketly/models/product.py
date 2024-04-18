from django.db import models
from authentication.models import User
from marketly.models import Category


class Product(models.Model):
    seller = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    is_approved = models.BooleanField(default=False)
    inventory = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title
