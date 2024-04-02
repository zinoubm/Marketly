setup:
	docker compose up --build

up:
	docker compose up

terminal: 
	docker exec -it marketly_dev-backend-1 /bin/bash

db:
	psql -h localhost -p 5432 -d marketly_dev_db -U marketly_dev_db_user -W

down:
	docker compose down

schema:
	python manage.py spectacular --file schema.yml

test:
	docker compose run backend python -m pytest --reuse-db

.PHONY: dev-image up bash down test rm build push
