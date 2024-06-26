from .models import ListItem
from .serializers import ListItemSerializer, UserSerializer

from datetime import date, timedelta, datetime

from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.contrib.auth import get_user_model

User = get_user_model()

def get_current_time():
    return datetime.now().time()
  
margin_of_error = timedelta(minutes=1)

def reminder():
    for user in User.objects.all():
        
        last_reminder_sent = user.last_reminder_sent
        if last_reminder_sent == date.today():
            continue
          
        reminder_datetime = datetime.combine(datetime.today(), user.reminder)
        print(reminder_datetime)
        latest_time = reminder_datetime + margin_of_error
        print(latest_time)
        print(get_current_time())
        print(reminder_datetime.time() <= get_current_time() <= latest_time.time())
        if reminder_datetime.time() <= get_current_time() <= latest_time.time():
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
            
            user.last_reminder_sent = date.today()
            
        else:
            continue
        
def checkin():
    for user in User.objects.all():
      
        last_check_in_sent = user.last_check_in_sent
        if user.last_check_in_sent == date.today():
            continue
          
        check_in_datetime = datetime.combine(datetime.today(), user.check_in)
        print(check_in_datetime)
        latest_time = check_in_datetime + margin_of_error
        print(latest_time)
        print(get_current_time())
        print(check_in_datetime.time() <= get_current_time() <= latest_time.time())
        if check_in_datetime.time() <= get_current_time() <= latest_time.time():
            if user.check_in <= get_current_time() <= latest_time.time():
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
                
                user.last_check_in_sent = date.today()
                
            else:
                continue
              
def test():
    subject='Did you complete your tasks today?'
    message = 'This is a test email sent using SMTP in Django.'
    from_email='alfonsobanzon@gmail.com'
    to=['thefonzie.codes@gmail.com']

    send_mail(
      subject, 
      message, 
      from_email, 
      to, 
      fail_silently=False)