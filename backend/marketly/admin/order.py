from django.contrib import admin
from marketly.models import Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "buyer",
        "status",
        "quantity",
    )
