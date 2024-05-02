FROM python:3.10-slim

ENV PYTHONBUFFERED=1

# Install cron
RUN apt-get update && apt-get install -y cron

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD python3 check-in.py && python3 reminder.py

# # Setup the cron jobs
# COPY crontab /etc/cron.d/my-cron-job
# RUN chmod 0644 /etc/cron.d/my-cron-job
# RUN crontab /etc/cron.d/my-cron-job
# RUN touch /var/log/cron.log

# # Run the command on container startup
# CMD cron && tail -f /var/log/cron.log
