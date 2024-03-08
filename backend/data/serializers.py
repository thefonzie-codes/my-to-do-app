from rest_framework import serializers
from .models import ListItem

class ListItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListItem
        fields = ['id', 'name', 'description', 'due_date', 'completed']