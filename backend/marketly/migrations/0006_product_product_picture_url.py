# Generated by Django 5.0.3 on 2024-04-19 05:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marketly', '0005_order_buyer'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='product_picture_url',
            field=models.URLField(blank=True),
        ),
    ]
