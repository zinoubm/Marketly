import pytest
from tests.fixtures import api_client, get_seller_id
from tests.factories import (
    UserFactory,
    ProductFactory,
    CompareListFactory,
    CompareItemFactory,
)


@pytest.mark.django_db
class TestCompareItemListCreateAPI:
    def setup_method(self, method):
        self.url = "http://localhost:8000/api/compare-items/"
        self.user = UserFactory()

        self.product = ProductFactory()
        self.user_compare_list = CompareListFactory(user=self.user, title="watches")
        self.user_compare_item = CompareItemFactory(
            product=self.product, compare_list=self.user_compare_list
        )

        self.other_user = UserFactory()
        self.other_user_compare_list = CompareListFactory(
            user=self.other_user, title="watches"
        )

    def test_add_to_compare_list(self, api_client):
        data = {
            "product": self.product.id,
            "compare_list": self.user_compare_list.id,
        }

        api_client.force_authenticate(user=self.user)
        response = api_client.post(self.url, data, format="json")

        assert response.status_code == 201

    def test_add_to_annothers_user_compare_list(self, api_client):
        data = {
            "product": self.product.id,
            "compare_list": self.other_user_compare_list.id,
        }

        api_client.force_authenticate(user=self.user)
        response = api_client.post(self.url, data, format="json")

        assert response.status_code == 403

    def test_get_compare_list_items(self, api_client):
        url = "http://localhost:8000/api/compare-lists/"

        api_client.force_authenticate(user=self.user)
        response = api_client.get(url, format="json")

        compare_lists = response.data
        compare_items = compare_lists[0]["compare_items"]

        assert response.status_code == 200
        assert len(compare_lists) == 1
        assert all(
            compare_list["user"] == self.user.id for compare_list in compare_lists
        )
        assert all(
            compare_item["compare_list"] == self.user_compare_list.id
            for compare_item in compare_items
        )
