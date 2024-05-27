#!/bin/sh
# Exit on error
set -e

# Apply database migrations
echo "Applying database migrations..."
python manage.py makemigrations
python manage.py migrate

# Create superuser
# echo "Creating superuser..."
# python manage.py create_superuser

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "starting cron jobs"
python manage.py crontab add

# Start the main process
echo "Starting server..."
exec "$@"
