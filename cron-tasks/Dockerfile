FROM python:3.10-slim

ENV PYTHONBUFFERED=1

# Install cron
RUN apt-get update

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD python3 check-in.py && python3 reminder.py
