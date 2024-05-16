from django.contrib import admin
from django.contrib.auth.admin import UserAdmin, UserCreationForm, UserChangeForm
from .models import CustomUser, ListItem

class CustomUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = CustomUser
        
class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = CustomUser
        
class CustomUserAdmin(UserAdmin):
    form = CustomUserChangeForm
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('reminder', 'check_in')}),
    )

    def has_add_permission(self, request):
        return True 
      
# class CustomUserCreationForm(UserCreationForm):
#     class Meta(UserCreationForm.Meta):
#         model = CustomUser
#         fields = ('username', 'email')  # Explicitly including 'email'


# class CustomUserAdmin(UserAdmin):
#     add_form = CustomUserCreationForm
#     form = CustomUserChangeForm
#     model = CustomUser
#     list_display = ['username', 'email', 'is_active', 'is_staff']

class ListItemAdmin(admin.ModelAdmin):
    list_display = ['name', 'due_date', 'completed', 'user']
    
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(ListItem, ListItemAdmin)
