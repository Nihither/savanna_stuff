import os.path

import environ
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent.parent
DOTENV_DIR = Path(__file__).resolve().parent.parent

env = environ.Env(
    DEBUG=(bool, False)
)
environ.Env.read_env(os.path.join(DOTENV_DIR, '.env'))

if env('DJANGO_ENV') == 'PROD':
    from .prod import *
else:
    from .dev import *
