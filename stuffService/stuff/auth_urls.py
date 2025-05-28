from django.urls import path

from stuff.auth_views import signin

urlpatterns = [
    path('signin', signin)
]