from django.db import models
from authentication.models import User


class OrderStatus(models.TextChoices):
    INCART = "InCart"
    PENDING = "Pending"
    SHIPPING = "Shipping"
    COMPLETED = "Completed"
    CANCELLED = "Cancelled"


class Order(models.Model):
    buyer = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    product = models.ForeignKey(
        "Product", on_delete=models.CASCADE, related_name="orders", null=True
    )
    quantity = models.PositiveIntegerField(default=1)
    date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20, choices=OrderStatus.choices, default=OrderStatus.PENDING
    )

    def __str__(self):
        return f"Order {self.id}"
