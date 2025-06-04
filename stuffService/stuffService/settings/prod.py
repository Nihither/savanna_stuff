from . import env
from .base import *


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = False

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env('DJANGO_DEBUG')

ALLOWED_HOSTS = env('ALLOWED_HOSTS').split(',')

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': env('DB_ENGINE'),
        'HOST': env('DB_HOST'),
        'PORT': env('DB_PORT'),
        'NAME': env('DB_NAME'),
        'USER': env('DB_USER'),
        'PASSWORD': env('DB_PASSWORD')
    }
}

CORS_ALLOWED_ORIGINS = env('CORS_ALLOWED_ORIGINS').split(',')
