"""
URL configuration for data project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from data import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', views.login),
    path('authenticate/', views.authenticate),
    path('signup/', views.signup),
    path('test_token/', views.test_token),
    path('list_items/', views.list_items),
    path('list_items/<int:id>', views.list_items_detail),
    path('my_list_items', views.get_items_by_user),
    path('email_reminder/', views.email_reminder),
    path('email_checkin/', views.email_checkin),
    path('test/', views.test_email),
    path('edit_user/', views.edit_user),
]

urlpatterns = format_suffix_patterns(urlpatterns)
