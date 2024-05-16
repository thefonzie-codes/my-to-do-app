from django.db import models
from datetime import date, time

from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.utils import timezone

class CustomUser(AbstractUser):
  email = models.EmailField('email address', unique=True, blank=False, null=False)
  reminder = models.TimeField(default=time(8, 0, 0))
  check_in = models.TimeField(default=time(20, 0, 0))

  groups = models.ManyToManyField(
      'auth.Group',
      verbose_name='groups',
      blank=True,
      help_text='The groups this user belongs to. A group represents a set of permissions.',
      related_name="customuser_groups",  # Changed related_name
      related_query_name="customuser",
  )
  user_permissions = models.ManyToManyField(
      'auth.Permission',
      verbose_name='user permissions',
      blank=True,
      help_text='Specific permissions for this user.',
      related_name="customuser_permissions",  # Changed related_name
      related_query_name="customuser",
  )
  
User = get_user_model()

def default_due_date():
  return timezone.now().date()

class ListItem(models.Model):
  name = models.CharField(max_length=100)
  description = models.TextField(blank=True, default='')
  due_date = models.DateField(default=default_due_date)
  completed = models.BooleanField(default=False)
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='list_items')
  
  def __str__(self):
    return self.name
  
  def is_overdue(self):
    return date.today() > self.due_date and not self.completed
  
  def is_completed(self):
    return self.completed