FROM python:3.10.12-slim

ENV PYTHONBUFFERED=1

WORKDIR /backend

COPY . .

RUN pip install python-dotenv
RUN pip install -r requirements.txt

EXPOSE 8000 

RUN python3 manage.py runserver