from django_q.tasks import schedule
from datetime import datetime

schedule('data.scheduled_emails.send_daily_reminder', 
         schedule_type='D', 
         repeats=-1,
         next_run=datetime.now())