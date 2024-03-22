from rest_framework import serializers
from .models import ListItem
from django.contrib.auth.models import User

class ListItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListItem
        fields = ['id', 'name', 'description', 'due_date', 'completed', 'user']

class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ['id', 'username', 'password']
