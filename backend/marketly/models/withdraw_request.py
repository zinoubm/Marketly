from django.db import models
from authentication.models import User


class WithdrawStatus(models.TextChoices):
    PENDING = "Pending"
    COMPLETED = "Completed"
    CANCELLED = "Cancelled"


class WithdrawRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=20, choices=WithdrawStatus.choices, default=WithdrawStatus.PENDING
    )

    def __str__(self):
        return self.status
