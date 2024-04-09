from .models import ListItem
from .serializers import ListItemSerializer

from datetime import date

from django.core.mail import send_mail
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags

def send_daily_reminder():
    ListItems = ListItem.objects.filter(due_date=date.today())
    serializer = ListItemSerializer(ListItems, many=True)
    data = serializer.data
    html_message = render_to_string("email-templates.html", {'tasks': data})
    plain_message = strip_tags(html_message)
    subject='Your To-Do List for Today'
    from_email='alfonsobanzon@gmail.com'
    to=['al_banzon@hotmail.com']

    send_mail(
      subject, 
      plain_message, 
      from_email, 
      to, 
      html_message=html_message,
      fail_silently=False)
    
    return 'Email sent'