from django.contrib import admin
from marketly.models import Category


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass
