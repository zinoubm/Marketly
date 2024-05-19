from django.contrib import admin
from marketly.models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_filter = ["is_approved"]
