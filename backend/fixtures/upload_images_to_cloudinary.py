import cloudinary
import cloudinary.uploader
import json

# Set your Cloudinary configuration
cloudinary.config(
    cloud_name="secret",
    api_key="secret",
    api_secret="secret",
)


def upload_images_to_cloudinary_and_write_new_fixture(fixture_file):
    with open(fixture_file, "r") as f:
        fixture = json.load(f)

    for item in fixture:
        product_image_url = item["fields"]["product_image"]
        try:
            # Upload image to Cloudinary
            result = cloudinary.uploader.upload(product_image_url)
            # Update the fixture with Cloudinary URL
            item["fields"]["product_image"] = result["secure_url"]
        except Exception as e:
            print(f"Error uploading image for product with ID {item['pk']}: {e}")

    updated_fixture_file = "products.json"
    with open(updated_fixture_file, "w") as f:
        json.dump(fixture, f, indent=4)

    print(f"Updated fixture file with Cloudinary URLs: {updated_fixture_file}")


# Example usage
fixture_file = "products_fixture.json"
upload_images_to_cloudinary_and_write_new_fixture(fixture_file)
