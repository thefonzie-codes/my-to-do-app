from rest_framework import serializers
from .models import ListItem
from django.contrib.auth import get_user_model

User = get_user_model()

class ListItemSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(source='user', queryset=User.objects.all())

    class Meta:
        model = ListItem
        fields = ['id', 'name', 'description', 'due_date', 'completed', 'user_id']

class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ['id', 'username', 'email', 'reminder', 'check_in']