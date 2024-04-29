from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from .views import (
    CategoryListAPIView,
    ProductListCreateAPIView,
    ProductRetrieveUpdateDestroyAPIView,
    BuyerOrderListAPIView,
    SellerOrderListAPIView,
    OrderRetrieveView,
    OrderCreateAPIView,
    OrderFromCartAPIView,
    CartListCreateAPIView,
    CartRemoveAPIView,
    NotificationListCreateAPIView,
    NotificationDetailAPIView,
    ReviewListCreateAPIView,
    ReviewDetailAPIView,
    WithdrawRequestDetailAPIView,
    WithdrawRequestListCreateAPIView,
)

# todo
# clean this mess with Include

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
        name="products-view",
    ),
    path("api/orders/", OrderCreateAPIView.as_view(), name="orders-create"),
    path(
        "api/orders/buyer",
        BuyerOrderListAPIView.as_view(),
        name="buyer-orders-list",
    ),
    path(
        "api/orders/seller",
        SellerOrderListAPIView.as_view(),
        name="seller-orders-list",
    ),
    path("api/orders/<int:pk>/", OrderRetrieveView.as_view(), name="orders-list"),
    path("api/cart/", CartListCreateAPIView.as_view(), name="cart-view"),
    path("api/cart/order", OrderFromCartAPIView.as_view(), name="order-from-cart-view"),
    path(
        "api/cart/<int:pk>/", CartRemoveAPIView.as_view(), name="remove-from-cart-view"
    ),
    path(
        "api/notifications/",
        NotificationListCreateAPIView.as_view(),
        name="notification-list",
    ),
    path(
        "api/notifications/<int:pk>/",
        NotificationDetailAPIView.as_view(),
        name="notification-detail",
    ),
    path(
        "api/reviews/",
        NotificationListCreateAPIView.as_view(),
        name="review-list",
    ),
    path(
        "api/reviews/<int:pk>/",
        NotificationDetailAPIView.as_view(),
        name="review-detail",
    ),
    path(
        "api/reviews/",
        ReviewListCreateAPIView.as_view(),
        name="review-list",
    ),
    path(
        "api/reviews/<int:pk>/",
        ReviewDetailAPIView.as_view(),
        name="review-detail",
    ),
    path(
        "api/withdraw-requests/",
        WithdrawRequestListCreateAPIView.as_view(),
        name="withdraw-list",
    ),
    path(
        "api/withdraw-requests/<int:pk>/",
        WithdrawRequestDetailAPIView.as_view(),
        name="withdraw-detail",
    ),
]
