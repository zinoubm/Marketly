import pytest
import factory

from marketly.models import Notification


@pytest.mark.django_db
class NotificationFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Notification
