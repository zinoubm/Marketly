FROM python:3.11.7-slim-bookworm

RUN apt-get update && \
    apt-get install -y gcc curl ca-certificates netcat-openbsd procps postgresql-client-15 python3-dev libpq-dev

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt
    
COPY . .

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
