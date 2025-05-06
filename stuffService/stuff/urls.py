from django.urls import path

from .views import reminders, reports

urlpatterns = [
    path('reminders', reminders),
    path('reports', reports)
]