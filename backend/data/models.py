from django.db import models
from datetime import date

class ListItem(models.Model):
  name = models.CharField(max_length=100)
  description = models.CharField(max_length=500, blank=True, default='')
  due_date = models.DateField(default=date.today())
  completed = models.BooleanField(default=False)

  def __str__(self):
    return self.name

from django.contrib.auth import get_user_model

User = get_user_model()