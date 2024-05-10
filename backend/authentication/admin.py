from django.contrib import admin
from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        "first_name",
        "email",
        "phone",
        "is_verified",
        "is_seller",
        "is_superuser",
    )
