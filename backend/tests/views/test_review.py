import pytest
from tests.fixtures import api_client, get_seller_id
from tests.factories import UserFactory, ProductFactory, ReviewFactory
from marketly.models import OrderStatus
import math

from django.core.exceptions import ObjectDoesNotExist


@pytest.mark.django_db
class TestReviewListCreateAPI:
    def setup_method(self, method):
        self.url = "http://localhost:8000/api/reviews/"
        self.user = UserFactory()
        self.product = ProductFactory(price=12)

    def test_create_review(self, api_client):
        api_client.force_authenticate(user=self.user)
        data = {
            "product": self.product.id,
            "rating": 5,
            "details": "wonderful product",
        }

        response = api_client.post(self.url, data, format="json")

        data = {
            "product": self.product.id,
            "rating": 2,
            "details": "wonderful product",
        }

        response = api_client.post(self.url, data, format="json")

        self.product.refresh_from_db()

        assert response.status_code == 201
        assert self.product.rating == math.floor((5 + 2) / 2)
