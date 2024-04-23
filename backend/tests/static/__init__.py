import os

current_directory = os.path.dirname(os.path.realpath(__file__))
image_path = os.path.join(current_directory, "mouse-2.jpg")

mouse_image = open(image_path, "rb")
