FROM python:3.10.12-slim

RUN apt-get update && apt-get install -y cron && rm -rf /var/lib/apt/lists/*

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED=1

WORKDIR /app

COPY requirements.txt .

RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

COPY . .
COPY entrypoint.sh /app/entrypoint.sh

RUN chmod +x /app/entrypoint.sh

EXPOSE 8000 

ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["gunicorn", "-b", "0.0.0.0:8000", "data.wsgi:application"]
