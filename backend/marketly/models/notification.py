from django.db import models
from authentication.models import User


class Notification(models.Model):
    title = models.CharField(max_length=255)
    details = models.TextField()
    is_seen = models.BooleanField(default=False)
    date = models.DateField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
