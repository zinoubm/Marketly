import pytest
from tests.fixtures import api_client

from tests.factories import UserFactory, ProductFactory, CategoryFactory
from tests.static import mouse_image


@pytest.mark.django_db
class TestProductListCreateAPIView:

    def setup_method(self, method):
        self.url = "http://localhost:8000/api/products/"
        self.seller = UserFactory()
        self.seller_product = ProductFactory(seller=self.seller)
        self.category = CategoryFactory()

        self.other_seller = UserFactory()
        self.other_seller_product = ProductFactory(seller=self.other_seller)

        self.verified_seller = UserFactory(is_verified=True)
        self.approved_product = ProductFactory(is_approved=True)

    def test_create_product(self, api_client):
        data = {
            "title": "gaming mouse",
            "description": "fast gaming mouse",
            "price": "25",
            "inventory": "24",
            "category": self.category.id,
        }

        files = {
            "product_image": (
                "mouse-2.jpg",
                mouse_image,
                "image/png",
            ),
        }

        api_client.force_authenticate(user=self.seller)
        response = api_client.post(
            self.url,
            data,
            files=files,
            format="multipart",
        )

        assert response.status_code == 201
        assert response.data["is_approved"] == False

    def test_create_product_with_verified_seller(self, api_client):
        data = {
            "title": "gaming mouse",
            "description": "fast gaming mouse",
            "price": "25",
            "inventory": "24",
            "category": self.category.id,
        }

        files = {
            "product_image": (
                "mouse-2.jpg",
                mouse_image,
                "image/png",
            ),
        }

        api_client.force_authenticate(user=self.verified_seller)
        response = api_client.post(
            self.url,
            data,
            files=files,
            format="multipart",
        )

        assert response.status_code == 201
        assert response.data["is_approved"] == True

    def test_list_products(self, api_client):
        api_client.force_authenticate(user=self.seller)
        response = api_client.get(self.url)

        products = response.data

        assert response.status_code == 200
        assert products, "Products list Is empty!"
        assert all(product["seller"] == self.seller.id for product in products)

    def test_search_products(self, api_client):
        url = self.url + "search/"
        api_client.force_authenticate(user=self.seller)
        response = api_client.get(url)

        products = response.data

        assert response.status_code == 200
        assert products, "Products list Is empty!"
        assert all(product["is_approved"] == True for product in products)


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
        category = CategoryFactory()
        new_title = "new title"

        data = {
            "title": new_title,
            "description": "fast gaming mouse",
            "price": "25",
            "inventory": "24",
            "category": category.id,
        }

        files = {
            "product_image": (
                "mouse-2.jpg",
                mouse_image,
                "image/png",
            ),
        }

        api_client.force_authenticate(user=self.user)
        response = api_client.put(
            self.url,
            data,
            files=files,
            format="multipart",
        )

        assert response.status_code == 200
        assert response.data["title"] == new_title

    def test_delete_product(self, api_client):
        api_client.force_authenticate(user=self.user)
        response = api_client.delete(self.url)

        assert response.status_code == 204
