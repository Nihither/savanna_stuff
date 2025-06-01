from .base import *


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-sxq8p+=0@4@v-d_x8o2^&%7b@9gv9&%o@9^wfehu$@(%wy88=c'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [
    '192.168.0.47'
]

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'HOST': '192.168.0.20',
        'PORT': '5432',
        'NAME': 'test',
        'USER': 'test',
        'PASSWORD': 'qwerty'
    }
}

CORS_ALLOWED_ORIGINS = [
    'http://192.168.0.47:5173',
    'http://192.168.0.47:8080'
]
