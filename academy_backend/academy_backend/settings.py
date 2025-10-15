import os
from pathlib import Path
from mongoengine import connect
from datetime import timedelta
from dotenv import load_dotenv

# ------------------------
# Base directory
# ------------------------
BASE_DIR = Path(__file__).resolve().parent.parent

# ------------------------
# Environment file selection
# ------------------------
ENV_FILE = os.environ.get("ENV_FILE", ".env_local")  # default to local
load_dotenv(BASE_DIR / ENV_FILE)

# ------------------------
# PORT (for Render)
# ------------------------
PORT = int(os.environ.get("PORT", 8000))

# ------------------------
# Google OAuth
# ------------------------
GOOGLE_CLIENT_ID = os.getenv("VITE_GOOGLE_CLIENT_ID")

# ------------------------
# SECURITY
# ------------------------
SECRET_KEY = os.getenv("SECRET_KEY", "unsafe-local-secret")
DEBUG = os.getenv("DEBUG", "True") == "True"
ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "localhost,127.0.0.1").split(",")

# ------------------------
# Installed apps
# ------------------------
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_extensions',
    # Third-party apps
    'corsheaders',
    'rest_framework',

    # Your apps
    'courses',
    'users',
]

# ------------------------
# Middleware
# ------------------------
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # must be at the top
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# ------------------------
# URLs and WSGI
# ------------------------
ROOT_URLCONF = 'academy_backend.urls'
WSGI_APPLICATION = 'academy_backend.wsgi.application'

# ------------------------
# Templates
# ------------------------
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# ------------------------
# Database (for Django auth/admin)
# ------------------------
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# ------------------------
# MongoDB connection (for Courses via MongoEngine)
# ------------------------
MONGO_ENV = os.getenv("MONGO_ENV", "local")  # default = local

if MONGO_ENV == "atlas":
    MONGO_URI = os.getenv("MONGO_ATLAS_URI")
else:
    MONGO_URI = os.getenv("MONGO_LOCAL_URI")

connect(host=MONGO_URI)

# ------------------------
# Password validation
# ------------------------
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# ------------------------
# Internationalization
# ------------------------
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Kolkata'
USE_I18N = True
USE_TZ = True

# ------------------------
# Static and Media files
# ------------------------
STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / "static"]
STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# ------------------------
# Default primary key field type
# ------------------------
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ------------------------
# Django REST Framework
# ------------------------
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}

# ------------------------
# CORS (for React frontend)
# ------------------------
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://bmacademyclient.vercel.app",
    "https://bmacademyadmin.vercel.app",
]

CORS_ALLOW_ALL_ORIGINS = False  # For dev only

# Optional: CSRF trusted origins for API
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:5173",
    "https://bmacademyclient.vercel.app",
    "https://bmacademyadmin.vercel.app",
]

# ------------------------
# JWT settings
# ------------------------
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),  # adjust as needed
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'AUTH_HEADER_TYPES': ('Bearer',),
}

# ------------------------
# Razorpay
# ------------------------
RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID")
RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET")
