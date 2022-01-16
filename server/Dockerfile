# syntax=docker/dockerfile:1
FROM python:3
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /server
COPY . /server/
COPY ~/.docker_env /server/
RUN pip install -r requirements.txt
