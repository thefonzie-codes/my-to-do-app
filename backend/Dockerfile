FROM python:3.10.12-slim

ENV PYTHONBUFFERED=1

WORKDIR /app

COPY requirements.txt .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN pip install python-dotenv

COPY . .

RUN python 

EXPOSE 8000 

CMD ["gunicorn" , "-b", "0.0.0.0:8000", "data.wsgi:application"]