from factory.django import DjangoModelFactory
from marketly.models.category import Category


class CategoryFactory(DjangoModelFactory):
    class Meta:
        model = Category
        django_get_or_create = ("title",)

    title = "Gaming Gear"
