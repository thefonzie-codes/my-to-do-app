from .models import ListItem
from .serializers import ListItemSerializer, UserSerializer

from datetime import date, timedelta, time, datetime

from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.contrib.auth import get_user_model

User = get_user_model()

current_time = datetime.now().time()
margin_of_error = timedelta(minutes=1)

def reminder():
    for user in User.objects.all():
        reminder_datetime = datetime.combine(datetime.today(), user.reminder)
        latest_time = reminder_datetime + margin_of_error
        if reminder_datetime.time() <= current_time <= latest_time.time():
            print("Reminder time")
            ListItems = ListItem.objects.filter(user=user, due_date=date.today())
            serializer = ListItemSerializer(ListItems, many=True)
            data = serializer.data
            
            if data == []:
                html_message = render_to_string("reminder-no-items.html")
                plain_message = strip_tags(html_message)
                subject='Your To-Do List for Today'
                from_email='alfonsobanzon@gmail.com'
                to = [user.email]
                
                send_mail(
                subject, 
                plain_message, 
                from_email, 
                to, 
                html_message=html_message,
                fail_silently=False)
                
                continue
              
            html_message = render_to_string("reminder.html", {'tasks': data})
            plain_message = strip_tags(html_message)
            subject='Your To-Do List for Today'
            from_email='alfonsobanzon@gmail.com'
            to = [user.email]
            
            send_mail(
              subject, 
              plain_message, 
              from_email, 
              to, 
              html_message=html_message,
              fail_silently=False)
            
        else:
            continue
        
def checkin():
    for user in User.objects.all():
        reminder_datetime = datetime.combine(datetime.today(), user.reminder)
        latest_time = reminder_datetime + margin_of_error
        if reminder_datetime.time() <= current_time <= latest_time.time():
            if user.check_in <= current_time <= user.check_in + margin_of_error:
                ListItems = ListItem.objects.filter(user=user, due_date=date.today())
                serializer = ListItemSerializer(ListItems, many=True)
                data = serializer.data
                
                if data == []:
                    continue
                    
                html_message = render_to_string("check-in-email.html", {'tasks': data})
                plain_message = strip_tags(html_message)
                subject='Did you complete your tasks today?'
                from_email='alfonsobanzon@gmail.com'
                to=[user.email]

                send_mail(
                  subject, 
                  plain_message, 
                  from_email, 
                  to, 
                  html_message=html_message,
                  fail_silently=False)
                
            else:
                continue