FROM python:3.10.12-slim

ENV PYTHONBUFFERED=1

WORKDIR /backend

COPY . .

RUN pip install --upgrade pip
RUN pip install python-dotenv
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000 

CMD python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000