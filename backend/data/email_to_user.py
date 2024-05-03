from .models import ListItem
from .serializers import ListItemSerializer

from datetime import date

from django.core.mail import send_mail
from django.contrib.auth import get_user_model
from django.conf import settings
from django.template.loader import render_to_string
from django.utils.html import strip_tags

def email_to_user(request):
    User = get_user_model()
    users = User.objects.all()
    for user in users:
        ListItems = ListItem.objects.filter(user=user, due_date=date.today())
        if not ListItems.exists():
            continue # Skip if no list items are due for today
          
        serializer = ListItemSerializer(ListItems, many=True)
        data = serializer.data
        if not data:
            continue  # Skip if serialization results in no data
          
        html_message = render_to_string("reminder.html", {'tasks': data})
        plain_message = strip_tags(html_message)
        subject='Your To-Do List for Today'
        from_email='alfonsobanzon@gmail.com'
        to=[user.email]
        
        send_mail(
            subject, 
            plain_message, 
            from_email, 
            to, 
            html_message=html_message,
            fail_silently=False)