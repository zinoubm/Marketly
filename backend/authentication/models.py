from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    is_verified = models.BooleanField(default=False)
    shipping_details = models.TextField(max_length=255, blank=True)
    phone = models.TextField(max_length=255, blank=True)
    balance = models.PositiveIntegerField(default=0)