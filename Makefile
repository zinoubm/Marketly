setup:
	docker compose up --build

up:
	docker compose up

terminal: 
	docker exec -it marketly_dev-backend-1 /bin/bash

feeddb:
	docker exec -it marketly_dev-backend-1 python manage.py feed_db

loaddata:
	docker exec -it marketly_dev-backend-1 python manage.py loaddata fixtures/categories.json fixtures/users.json fixtures/products.json fixtures/orders.json fixtures/reviews.json

flush:
	docker exec -it marketly_dev-backend-1 python manage.py flush --noinput 

db:
	psql -h localhost -p 5432 -d marketly_dev_db -U marketly_dev_db_user -W

down:
	docker compose down

schema:
	python manage.py spectacular --file schema.yml

test:
	docker compose run backend python -m pytest --reuse-db

.PHONY: dev-image up bash down test rm build push

