import pytest
from tests.fixtures import api_client, get_seller_id
from tests.factories import UserFactory, NotificationFactory
import math

from django.core.exceptions import ObjectDoesNotExist


@pytest.mark.django_db
class TestReviewListCreateAPI:
    def setup_method(self, method):
        self.url = "http://localhost:8000/api/notifications/"
        self.user = UserFactory()
        self.user_notification = NotificationFactory(user=self.user)
        self.other_user = UserFactory()
        self.other_user_notification = NotificationFactory(user=self.other_user)

    def test_get_notifications(self, api_client):
        api_client.force_authenticate(user=self.user)
        response = api_client.get(self.url, format="json")
        notifications = response.data

        assert response.status_code == 200
        assert all(
            notification["user"] == self.user.id for notification in notifications
        )
