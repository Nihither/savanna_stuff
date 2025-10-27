from django.urls import path

from stuff.views.auth_views import signin, signout, pass_change

urlpatterns = [
    path('signin', signin),
    path('signout', signout),
    path('pass_change', pass_change),
]
