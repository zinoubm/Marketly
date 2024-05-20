from django.contrib import admin
from marketly.models import Notification


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    pass
