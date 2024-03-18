# Endpoints

from .models import ListItem
from .serializers import ListItemSerializer, UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

@api_view(['GET', 'POST'])
def list_items(request, format=None):
  
  if request.method == 'GET':
    ListItems = ListItem.objects.all()
    serializer = ListItemSerializer(ListItems, many=True)
    return Response(serializer.data)

  if request.method == 'POST':
    serializer = ListItemSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED )
    
@api_view(['GET', 'PUT', 'DELETE'])
def list_items_detail(request, id, format=None):
  
  try:
    list_item = ListItem.objects.get(pk=id)
  except ListItem.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)
  
  if request.method == 'GET':
    serializer = ListItemSerializer(list_item)
    return Response(serializer.data)
  elif request.method == 'PUT':
    serializer = ListItemSerializer(list_item, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  elif request.method == 'DELETE':
    list_item.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
  
@api_view(['POST'])
def login(request, format=None):
  return Response({})

@api_view(['POST'])
def signup(request, format=None):
  serializer = UserSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
    user = User.objects.get(username=request.data['username'])
    user.set_password(request.data['password'])
    user.save()
    token = Token.objects.create(user=user)
    return Response({'token': token.key, 'user': serializer.data})
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def test_token(request, format=None):
  return Response({})