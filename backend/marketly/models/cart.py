from django.db import models
from authentication.models import User
from marketly.models import Order


class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    orders = models.ManyToManyField(Order)

    # add an order with amount and status = INCART
    def add_to_cart(self, order):
        self.products.add(order)

    def remove_from_cart(self, order):
        self.products.remove(order)
