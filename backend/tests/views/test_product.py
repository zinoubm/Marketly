import pytest
from tests.fixtures import api_client

from tests.factories import UserFactory, ProductFactory, CategoryFactory


@pytest.mark.django_db
class TestProductListCreateAPIView:

    def setup_method(self, method):
        self.url = "http://localhost:8000/api/products/"
        self.user = UserFactory()

    def test_create_product(self, api_client):
        category = CategoryFactory()

        data = {
            "title": "some product",
            "description": "some product description",
            "inventory": 20,
            "category": category.id,
        }

        api_client.force_authenticate(user=self.user)
        response = api_client.post(self.url, data, format="json")

        assert response.status_code == 201

    def test_list_products(self, api_client):
        product = ProductFactory()

        api_client.force_authenticate(user=self.user)
        response = api_client.get(self.url)

        assert response.status_code == 200
        assert len(response.data) == 1


@pytest.mark.django_db
class TestProductAPIView:
    def setup_method(self, method):
        self.base_url = "http://localhost:8000/api/products"
        self.user = UserFactory()
        self.product = ProductFactory()
        self.category = CategoryFactory()
        self.url = f"{self.base_url}/{self.product.id}/"

    def test_retrieve_product(self, api_client):
        api_client.force_authenticate(user=self.user)
        response = api_client.get(self.url)

        assert response.status_code == 200
        assert response.data["title"] == self.product.title

    def test_update_product(self, api_client):
        new_title = "new title"
        data = {
            "title": new_title,
            "description": "some product description",
            "inventory": 20,
            "category": self.category.id,
        }

        api_client.force_authenticate(user=self.user)
        response = api_client.put(self.url, data, format="json")

        assert response.status_code == 200
        assert response.data["title"] == new_title

    def test_delete_product(self, api_client):
        api_client.force_authenticate(user=self.user)
        response = api_client.delete(self.url)

        assert response.status_code == 204
