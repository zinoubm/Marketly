from django.contrib import admin
from .models import User
from marketly.models import Notification

from django.contrib.admin.helpers import ActionForm
from django import forms


class FeedbackForm(ActionForm):
    feedback_field = forms.CharField(required=False)


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_filter = ["is_verified"]
    list_display = (
        "first_name",
        "email",
        "phone",
        "is_verified",
        "is_seller",
        "is_superuser",
    )
    actions = ["verify_seller", "send_feedback"]
    action_form = FeedbackForm

    def verify_seller(self, request, queryset):
        for seller in queryset:
            notification = Notification.objects.create(
                title="Seller Verified",
                user=seller,
                details=f"Congratulation 🎉!\n You're now a verified seller!",
            )
            notification.save()

        queryset.update(is_verified=True)

    def send_feedback(self, request, queryset):
        feedback = request.POST["feedback_field"]
        for seller in queryset:
            notification = Notification.objects.create(
                title="Seller Rejection Feedback",
                user=seller,
                details=f"Your're rejected as a seller, Here's a feedback from the admin: \n {feedback}",
            )

            notification.save()
