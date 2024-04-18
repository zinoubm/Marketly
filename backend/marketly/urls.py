from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from .views import (
    CategoryListAPIView,
    ProductListCreateAPIView,
    ProductRetrieveUpdateDestroyAPIView,
    OrderListCreateAPIView,
    RetrieveOrderView,
)

urlpatterns = [
    path("api/auth/", include("authentication.urls")),
    path("admin/", admin.site.urls),
    path("schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="documentation"
    ),
    path("api/categories/", CategoryListAPIView.as_view(), name="categories-list"),
    path("api/products/", ProductListCreateAPIView.as_view(), name="products-list"),
    path(
        "api/products/<int:pk>/",
        ProductRetrieveUpdateDestroyAPIView.as_view(),
        name="products-list",
    ),
    path("api/orders/", OrderListCreateAPIView.as_view(), name="orders-list"),
    path("api/orders/<int:pk>/", RetrieveOrderView.as_view(), name="orders-list"),
]
