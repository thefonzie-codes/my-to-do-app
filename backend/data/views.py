# Endpoints
from .models import ListItem
from .serializers import ListItemSerializer, UserSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth import get_user_model
User = get_user_model()
from django.shortcuts import get_object_or_404

from datetime import date

# List Item API endpoints
# Retrieves all list items
@api_view(['GET', 'PUT', 'POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def list_items(request, format=None):
  
  if request.method == 'GET':
    ListItems = ListItem.objects.all()
    serializer = ListItemSerializer(ListItems, many=True)
    return Response(serializer.data)

  elif request.method == 'POST':
    user = request.user
    data = request.data
    data['user_id'] = user.id
    serializer = ListItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user_id=user.id)  # Associate the current user with the ListItem
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# API endpoints for individual List Items
@api_view(['GET', 'PUT', 'DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def list_items_detail(request, id, format=None):
  
  try:
    list_item = ListItem.objects.get(pk=id)
  except ListItem.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND)
  
  if request.method == 'GET':
    serializer = ListItemSerializer(list_item)
    return Response(serializer.data)
  elif request.method == 'PUT':
    user = request.user
    data = request.data
    data['user_id'] = user.id
    serializer = ListItemSerializer(list_item, data=data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  elif request.method == 'DELETE':
    list_item.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
  
# API Endpoints for user data
# Retrieves user list items
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_items_by_user(request, format=None):
  user = request.user
  ListItems = ListItem.objects.filter(user=user)
  serializer = ListItemSerializer(ListItems, many=True)
  return Response(serializer.data, status=status.HTTP_200_OK)

# Login
@api_view(['POST'])
def login(request, format=None):
  user = get_object_or_404(User, username=request.data['username'])
  if not user.check_password(request.data['password']):
    return Response({"detail": "Not found"}, status=status.HTTP_401_UNAUTHORIZED)
  token, created = Token.objects.get_or_create(user=user)
  serializer = UserSerializer(instance=user)
  return Response({'token': token.key, 'user': serializer.data})

# Authenticates Token
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def authenticate(request, format=None):
  serializer = UserSerializer(request.user)
  return Response(serializer.data)

# Registration
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

# Edits user settings/profile
@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def edit_user(request, format=None):
  try:
    print(request.data['username'])
    user = User.objects.get(username=request.data['username'])
  except User.DoesNotExist:
    return Response({ 'error' : 'User not found' }, status=status.HTTP_404_NOT_FOUND)
  
  serializer = UserSerializer(user, data=request.data, partial=True)
  if serializer.is_valid():
    serializer.save()
    return Response({'user': user})
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# API Endpoint to test Token Auth
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request, format=None):
  return Response({"passed for {}".format(request.user.username)})
  
# API Endpoints for email reminders and check-ins, along with a test email
from data.scheduled_emails import checkin, reminder, test

@api_view(['GET'])
def email_reminder(request, format=None):
  reminder()
  return Response({"email reminder sent"})

@api_view(['GET'])
def email_checkin(request, format=None):
  checkin()
  return Response({"email check-in sent"})

@api_view(['GET'])
def test_email(request, format=None):
  test()
  return Response({"test email sent"})