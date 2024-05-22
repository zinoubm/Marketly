import pytest
from tests.fixtures import api_client, get_seller_id
from tests.factories import UserFactory, ProductFactory, OrderFactory
from marketly.models import OrderStatus

from django.core.exceptions import ObjectDoesNotExist


@pytest.mark.django_db
class TestCartListAPI:
    def setup_method(self, method):
        self.url = "http://localhost:8000/api/cart/"
        self.inventory = 999
        self.seller = UserFactory()
        self.product = ProductFactory(seller=self.seller, inventory=self.inventory)

        self.buyer = UserFactory()
        self.order = OrderFactory(buyer=self.buyer, product=self.product, status=OrderStatus.INCART, quantity=1)
        self.non_cart_order = OrderFactory(buyer=self.buyer, status=OrderStatus.PENDING)

    def test_get_cart_content(self, api_client):
        api_client.force_authenticate(user=self.buyer)
        response = api_client.get(self.url)

        assert response.status_code == 200
        assert response.data[0]["id"] == self.order.id

    def test_add_to_cart(self, api_client):
        data = {
            "product": self.product.id,
            "quantity": 20,
            "date": "2024-04-20",
            "buyer": self.buyer.id,
        }

        api_client.force_authenticate(user=self.buyer)
        response = api_client.post(self.url, data)

        print("data", response.data)

        assert response.status_code == 201
        assert response.data["status"] == OrderStatus.INCART

    def test_remove_from_cart(self, api_client):
        url = f"{self.url}{self.order.id}/"
        api_client.force_authenticate(user=self.buyer)
        response = api_client.delete(url)

        try:
            self.order.refresh_from_db()
        except ObjectDoesNotExist:
            self.order = None

        assert self.order is None
        assert response.status_code == 204

    def test_remove_from_non_cart_order(self, api_client):
        url = f"{self.url}{self.non_cart_order.id}/"
        api_client.force_authenticate(user=self.buyer)
        response = api_client.delete(url)

        try:
            self.non_cart_order.refresh_from_db()
        except ObjectDoesNotExist:
            self.non_cart_order = None

        assert response.status_code == 404
        assert self.non_cart_order is not None

    def test_making_orders_from_cart(self, api_client):
        url = "http://localhost:8000/api/cart/order"
        api_client.force_authenticate(user=self.buyer)
        response = api_client.post(url)

        self.order.refresh_from_db()
        self.product.refresh_from_db()

        assert response.status_code == 201
        assert self.order.status == OrderStatus.PENDING
        assert self.product.inventory == self.inventory - 1
