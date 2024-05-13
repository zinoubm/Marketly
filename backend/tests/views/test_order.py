import pytest
from tests.fixtures import api_client, get_seller_id
from tests.factories import UserFactory, ProductFactory, OrderFactory
from marketly.models import OrderStatus


@pytest.mark.django_db
class TestOrderCreation:
    def setup_method(self, method):
        self.url = "http://localhost:8000/api/orders/"
        self.inventory = 10

        self.buyer = UserFactory()
        self.product = ProductFactory(inventory=self.inventory)

    def test_create_order(self, api_client):
        data = {
            "product": self.product.id,
            "quantity": self.inventory - 1,
            "date": "2024-04-30",
            "status": OrderStatus.COMPLETED,
        }

        api_client.force_authenticate(user=self.buyer)
        response = api_client.post(self.url, data, format="json")

        assert response.status_code == 201
        assert response.data["buyer"] == self.buyer.id
        assert (
            response.data["status"] == OrderStatus.PENDING
        )  # order status on creation must be ignored

    def test_decrease_Inventory_whith_order_create(self, api_client):
        quantity = 1
        data = {
            "product": self.product.id,
            "quantity": quantity,
            "date": "2024-04-30",
        }

        api_client.force_authenticate(user=self.buyer)
        response = api_client.post(self.url, data, format="json")

        self.product.refresh_from_db()

        assert response.status_code == 201
        assert self.product.inventory == self.inventory - quantity

    def test_not_allow_create_order_insufficient_inventory(self, api_client):
        data = {
            "product": self.product.id,
            "quantity": self.inventory + 1,
            "date": "2024-04-30",
        }

        api_client.force_authenticate(user=self.buyer)
        response = api_client.post(self.url, data, format="json")

        assert response.status_code == 400


@pytest.mark.django_db
class TestBuyerOrderListAPI:
    def setup_method(self, method):
        self.url = "http://localhost:8000/api/orders/buyer"
        self.buyer = UserFactory()
        self.buyer_order = OrderFactory(buyer=self.buyer)

        self.other_buyer = UserFactory()
        self.other_buyer_order = OrderFactory(buyer=self.other_buyer)

        self.cart_order = OrderFactory(buyer=self.buyer, status=OrderStatus.INCART)

    def test_list_orders(self, api_client):
        api_client.force_authenticate(user=self.buyer)
        response = api_client.get(self.url)
        orders = response.data

        assert response.status_code == 200
        assert orders, "Orders list is empty!"
        assert self.buyer != self.other_buyer
        assert all(order["buyer"] == self.buyer.id for order in orders)
        assert all(order["status"] != OrderStatus.INCART for order in orders)


@pytest.mark.django_db
class TestSellerOrderListAPI:
    def setup_method(self, method):
        self.url = "http://localhost:8000/api/orders/seller"
        self.seller = UserFactory()
        self.seller_product = ProductFactory(seller=self.seller)
        self.seller_order = OrderFactory(product=self.seller_product)

        self.other_seller = UserFactory()
        self.other_seller_product = ProductFactory(seller=self.other_seller)
        self.other_seller_order = OrderFactory(product=self.other_seller_product)

        self.cart_order = OrderFactory(
            product=self.seller_product, status=OrderStatus.INCART
        )

    def test_list_orders(self, api_client, get_seller_id):
        api_client.force_authenticate(user=self.seller)
        response = api_client.get(self.url)
        orders = response.data

        assert response.status_code == 200
        assert orders, "orders is empty"
        assert self.seller != self.other_seller
        assert all(get_seller_id(order) == self.seller.id for order in orders)
        assert all(order["status"] != OrderStatus.INCART for order in orders)


@pytest.mark.django_db
class TestOrderRetrieveAPI:
    def setup_method(self, method):
        self.base_url = "http://localhost:8000/api/orders"
        self.buyer = UserFactory()
        self.seller = UserFactory()
        self.product = ProductFactory(seller=self.seller)
        self.order = OrderFactory(buyer=self.buyer, product=self.product)

        self.other_user = UserFactory()

        self.cart_order = OrderFactory(product=self.product, status=OrderStatus.INCART)

        self.url = f"{self.base_url}/{self.order.id}/"

    def test_retrieve_orders_as_buyer(self, api_client, get_seller_id):
        api_client.force_authenticate(user=self.buyer)
        response = api_client.get(self.url)

        assert response.status_code == 200
        assert response.data["id"] == self.order.id

    def test_retrieve_orders_as_seller(self, api_client, get_seller_id):
        api_client.force_authenticate(user=self.seller)
        response = api_client.get(self.url)

        assert response.status_code == 200
        assert response.data["id"] == self.order.id

    def test_retrieve_orders_as_other_user(self, api_client, get_seller_id):
        api_client.force_authenticate(user=self.other_user)
        response = api_client.get(self.url)

        assert response.status_code == 403

    def test_not_allow_retrieve_incart_for_sellers(self, api_client, get_seller_id):
        url = f"{self.base_url}/{self.cart_order.id}/"

        api_client.force_authenticate(user=self.seller)
        response = api_client.get(url)

        assert response.status_code == 403


@pytest.mark.django_db
class TestOrderUpdateAPI:
    def setup_method(self, method):
        self.base_url = "http://localhost:8000/api/orders"
        self.buyer = UserFactory()
        self.seller = UserFactory()
        self.product = ProductFactory(seller=self.seller)
        self.order = OrderFactory(buyer=self.buyer, product=self.product)

    def test_update_order(self, api_client, get_seller_id):
        url = f"{self.base_url}/status/{self.order.id}/"
        data = {
            "product": self.product.id,
            "quantity": 12,
            "status": OrderStatus.SHIPPING,
        }

        api_client.force_authenticate(user=self.seller)
        response = api_client.patch(url, data, format="json")

        assert response.status_code == 200
        assert self.order.status == OrderStatus.SHIPPING

    def test_not_allow_incart_update(self, api_client, get_seller_id):
        url = f"{self.base_url}/status/{self.order.id}/"
        data = {
            "product": self.product.id,
            "quantity": 12,
            "status": "InCart",
        }

        api_client.force_authenticate(user=self.seller)
        response = api_client.patch(url, data, format="json")

        assert response.status_code == 403

    def test_not_allow_pending_update(self, api_client, get_seller_id):
        url = f"{self.base_url}/status/{self.order.id}/"
        data = {
            "product": self.product.id,
            "quantity": 12,
            "status": OrderStatus.PENDING,
        }

        api_client.force_authenticate(user=self.seller)
        response = api_client.patch(url, data, format="json")

        assert response.status_code == 403
