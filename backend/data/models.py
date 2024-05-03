from django.db import models
from datetime import date

from django.contrib.auth import get_user_model
from django.conf import settings
from django.utils import timezone

User = get_user_model()

def default_due_date():
  return timezone.now().date()

class ListItem(models.Model):
# Model representing a list item in a to-do list.
# Each item is linked to a user and has a name, description, due date, and completion status.
  name = models.CharField(max_length=100)
  description = models.CharField(max_length=500, blank=True, default='')
  due_date = models.DateField(default=default_due_date)
  completed = models.BooleanField(default=False)
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='list_items')
  
  def __str__(self):
    return self.name
  
  def is_overdue(self):
    return date.today() > self.due_date and not self.completed
  
  def is_completed(self):
    return self.completed