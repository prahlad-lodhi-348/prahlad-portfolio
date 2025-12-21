from django.contrib import admin
from .models import Feedback

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'project', 'created_at']
    list_filter = ['project', 'created_at']
    search_fields = ['name', 'email', 'comment']
