# Generated by Django 5.0.3 on 2024-04-23 19:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0005_user_google_profile_picture'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='google_profile_picture',
            new_name='google_profile_image',
        ),
    ]