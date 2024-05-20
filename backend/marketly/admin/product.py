from django.contrib import admin
from marketly.models import Product, Notification

from django.contrib.admin.helpers import ActionForm
from django import forms


class FeedbackForm(ActionForm):
    feedback_field = forms.CharField(required=False)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_filter = ["is_approved"]
    actions = ["approve_product", "send_feedback"]
    action_form = FeedbackForm

    def approve_product(self, request, queryset):
        for product in queryset:
            notification = Notification.objects.create(
                title="Product Approved",
                user=product.seller,
                details=f"Congratulation 🎉!\nYour product '{product.__str__()}' has been approved!",
            )
            notification.save()

        queryset.update(is_approved=True)

    def send_feedback(self, request, queryset):
        feedback = request.POST["feedback_field"]
        for product in queryset:
            notification = Notification.objects.create(
                title="Product Rejection Feedback",
                user=product.seller,
                details=f"Your product '{product.__str__()}' has been rejected, Here's a feedback from the admin: \n {feedback}",
            )

            notification.save()
