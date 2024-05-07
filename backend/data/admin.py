from django.contrib import admin
from django.contrib.auth.admin import UserAdmin, UserCreationForm, UserChangeForm
from .models import CustomUser, ListItem

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['username', 'email', 'is_active', 'is_staff']

    def has_add_permission(self, request):
        return True 
      
class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = CustomUser
        fields = ('username', 'email')  # Explicitly including 'email'

class CustomUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = CustomUser
        fields = UserChangeForm.Meta.fields

class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ['username', 'email', 'is_active', 'is_staff']

class ListItemAdmin(admin.ModelAdmin):
    list_display = ['name', 'due_date', 'completed', 'user']
    
admin.site.register(CustomUser,CustomUserAdmin)
admin.site.register(ListItem, ListItemAdmin)
