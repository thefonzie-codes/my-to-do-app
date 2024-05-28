# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Install cron
RUN apt-get update && apt-get install -y cron

# Create a directory to hold the application code inside the image
WORKDIR /app

# Install Python dependencies (if any)
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the crontab file to the cron.d directory
COPY crontab /etc/cron.d/crontab
RUN chmod 0644 /etc/cron.d/crontab

# Apply cron job
RUN crontab /etc/cron.d/crontab

# Copy the script into the container at /app
COPY . .

# Give execution rights on the cron job
RUN chmod 0744 /app/check-in.py
RUN chmod 0744 /app/reminder.py
RUN chmod 0744 /app/check-in.py

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

# FROM python:3.10-slim

# ENV PYTHONBUFFERED=1

# # Install cron
# RUN apt-get update && apt-get install -y cron

# WORKDIR /app

# COPY requirements.txt .
# RUN pip install --no-cache-dir -r requirements.txt

# COPY . .

CMD python3 check-in.py && python3 reminder.py
