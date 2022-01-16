# syntax=docker/dockerfile:1
FROM python:3
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /usr/src/server
COPY requirements.txt /usr/src/server/
RUN pip install --no-cache-dir -r requirements.txt
