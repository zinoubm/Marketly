from django.db import models
from authentication.models import User


class OrderStatus(models.TextChoices):
    PENDING = "Pending"
    SHIPPING = "Shipping"
    COMPLETED = "Completed"
    CANCELLED = "Cancelled"


class Order(models.Model):
    date = models.DateField()
    status = models.CharField(
        max_length=20, choices=OrderStatus.choices, default=OrderStatus.PENDING
    )

    buyer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    products = models.ManyToManyField("Product", related_name="orders")

    def __str__(self):
        return f"Order {self.id}"
