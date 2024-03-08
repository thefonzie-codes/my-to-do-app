# Endpoints

from django.http import JsonResponse
from .models import ListItem
from .serializers import ListItemSerializer

def list_items(request):
  
    ListItems = ListItem.objects.all()
    serializer = ListItemSerializer(ListItems, many=True)
    return JsonResponse({'list_items' : serializer.data}, safe=False)