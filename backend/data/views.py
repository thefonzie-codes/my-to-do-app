# Endpoints

from django.http import JsonResponse
from .models import ListItem
from .serializers import ListItemSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET', 'POST'])
def list_items(request, format=None):
  
  if request.method == 'GET':
    ListItems = ListItem.objects.all()
    serializer = ListItemSerializer(ListItems, many=True)
    return JsonResponse({'list_items' : serializer.data}, headers={'Access-Control-Allow-Origin': '*'})

  if request.method == 'POST':
    serializer = ListItemSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)

      