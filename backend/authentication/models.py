from django.db import models
from django.contrib.auth.models import AbstractUser
from authentication.managers import UserManager


class User(AbstractUser):
    is_verified = models.BooleanField(default=False)
    shipping_details = models.TextField(max_length=255, blank=True)
    phone = models.TextField(max_length=255, blank=True)
    balance = models.PositiveIntegerField(default=0)
    billing_details = models.TextField(max_length=255, blank=True)
    profile_image = models.ImageField(upload_to="images/", blank=True)
    google_profile_image = models.URLField(max_length=255, blank=True)
    email = models.EmailField(max_length=250, null=True, unique=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    objects = UserManager()

    @property
    def image(self):
        if self.profile_image and hasattr(self.profile_image, "url"):
            return self.profile_image.url

        if self.google_profile_image:
            return self.google_profile_image

        # todo
        # Instead of returning None return a default user Image
        return None
