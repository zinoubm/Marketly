from django.core.management.base import BaseCommand
import requests
from authentication.models import User
from django.contrib.auth.hashers import make_password
import random
from marketly.models import Category, Product, Review, Order
from marketly.models.order import OrderStatus


class Command(BaseCommand):
    product_reviews = [
        {"rating": 5, "review": "I love this product! It's exactly what I needed."},
        {
            "rating": 4,
            "review": "This product exceeded my expectations. Highly recommended.",
        },
        {
            "rating": 5,
            "review": "Great quality and fast shipping. Very satisfied with my purchase.",
        },
        {
            "rating": 2,
            "review": "The product arrived damaged. Disappointed with the condition.",
        },
        {
            "rating": 4,
            "review": "I'm happy with this purchase. The price was reasonable for the quality.",
        },
        {
            "rating": 1,
            "review": "Not as described. The color is different from the picture.",
        },
        {
            "rating": 5,
            "review": "Excellent customer service. They promptly resolved my issue.",
        },
        {
            "rating": 4,
            "review": "I've been using this product for months and it's still in great condition.",
        },
        {
            "rating": 5,
            "review": "The product is easy to use and durable. Definitely worth the price.",
        },
        {
            "rating": 1,
            "review": "Terrible experience. The product broke after a few uses.",
        },
        {
            "rating": 5,
            "review": "I would buy from this seller again. Smooth transaction and good communication.",
        },
        {
            "rating": 3,
            "review": "The size was smaller than expected. Make sure to check the dimensions.",
        },
        {
            "rating": 5,
            "review": "The product is perfect for my needs. I would recommend it to others.",
        },
        {
            "rating": 2,
            "review": "Average quality. It does the job but nothing special.",
        },
        {
            "rating": 4,
            "review": "The packaging was secure and arrived without any damage.",
        },
        {
            "rating": 5,
            "review": "The product is lightweight and portable, which is convenient for travel.",
        },
        {
            "rating": 1,
            "review": "The product doesn't meet the advertised features. Disappointed.",
        },
        {
            "rating": 5,
            "review": "Amazing product! It's a game-changer for my daily routine.",
        },
        {
            "rating": 2,
            "review": "The product arrived late. Shipping took longer than expected.",
        },
        {
            "rating": 4,
            "review": "I'm impressed by the quality and attention to detail. Well worth the price.",
        },
    ]

    def handle(self, *args, **options):
        user_res = requests.get("https://randomuser.me/api/?results=50&nat=us")
        password = make_password("marketly123")
        for item in user_res.json()["results"]:
            is_ver = random.randint(0, 100) <= 10
            is_sel = random.randint(0, 100) <= 30
            shipping_details = (
                item["location"]["state"]
                + ", "
                + item["location"]["city"]
                + ", "
                + item["location"]["street"]["name"]
            )
            billing_details = ""
            balance = 0
            if is_sel:
                billing_details = shipping_details
                if random.randint(0, 100) < 40:
                    balance = random.randint(0, 400)

            User.objects.create(
                email=item["email"],
                first_name=item["name"]["first"],
                last_name=item["name"]["last"],
                password=password,
                shipping_details=shipping_details,
                billing_details=billing_details,
                profile_image=item["picture"]["medium"],
                balance=balance,
                is_seller=is_sel,
                is_verified=is_ver,
                phone=item["phone"],
            )
        categories_res = requests.get("https://fakestoreapi.com/products/categories/")
        for item in categories_res.json():
            Category.objects.create(title=item.capitalize())
        products_res = requests.get("https://fakestoreapi.com/products/")
        products_json = products_res.json()
        for item in products_json:
            seller = User.objects.filter(is_seller=True).order_by("?")[0]
            category = Category.objects.get(title=item["category"].capitalize())
            inventory = random.randint(0, 100)
            Product.objects.create(
                title=item["title"],
                description=item["description"],
                price=item["price"],
                is_approved=True,
                seller=seller,
                category=category,
                inventory=inventory,
                product_image=item["image"],
            )
        for i in range(50):
            review_obj = self.product_reviews[
                random.randint(0, len(self.product_reviews) - 1)
            ]
            user = User.objects.filter(is_seller=False).order_by("?")[0]
            product = Product.objects.all().order_by("?")[0]
            Review.objects.create(
                rating=review_obj["rating"],
                details=review_obj["review"],
                user=user,
                product=product,
            )
        for i in range(20):
            buyer = User.objects.filter(is_seller=False).order_by("?")[0]
            product = Product.objects.all().order_by("?")[0]
            quantity = random.randint(1, 3)
            random_order_status = random.choice(
                [status[0] for status in OrderStatus.choices]
            )
            Order.objects.create(
                buyer=buyer,
                product=product,
                quantity=quantity,
                status=random_order_status,
            )
