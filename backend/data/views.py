# Endpoints

from django.http import JsonResponse
from .models import ListItem
from .serializers import ListItemSerializer

def list_items(request, format=None):
  
    ListItems = ListItem.objects.all()
    serializer = ListItemSerializer(ListItems, many=True)
    return JsonResponse({'list_items' : serializer.data}, headers={'Access-Control-Allow-Origin': '*'})