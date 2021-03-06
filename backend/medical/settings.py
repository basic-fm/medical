import os
import sys
from pathlib import Path

import dj_database_url
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

DEVELOPMENT_MODE = os.getenv("DEVELOPMENT_MODE", "True") == "True"
DEBUG = os.getenv("DEBUG", "True") == "True"


ROOT_URLCONF = "medical.urls"
WSGI_APPLICATION = "medical.wsgi.application"

SECRET_KEY = os.environ.get("SECRET_KEY")


# Application definition
INSTALLED_APPS = [
    "django_light",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # installed apps
    "rest_framework",
    "rest_framework.authtoken",
    "django_filters",
    "storages",
    # local apps
    "medical.tracking",
    "medical.accounts",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    # "core.middleware.DebugMiddleware",
]


TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            BASE_DIR / "templates",
        ],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


# Database
# if DEVELOPMENT_MODE is True:
#     DATABASES = {
#         "default": {
#             "ENGINE": "django.db.backends.sqlite3",
#             "NAME": BASE_DIR / "db.sqlite3",
#         }
#     }
# elif len(sys.argv) > 0 and sys.argv[1] != "collectstatic":
if os.getenv("DATABASE_URL", None) is None:
    raise Exception("DATABASE_URL environment variable not defined")

DATABASES = {
    "default": dj_database_url.parse(os.environ.get("DATABASE_URL") or ""),
}


# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
LANGUAGE_CODE = "de-de"
TIME_ZONE = "Europe/Berlin"
USE_I18N = False
USE_L10N = True
USE_TZ = True

# Default primary key field type
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Static files (CSS, JavaScript, Images)
STATIC_URL = "/static/"
STATICFILES_DIRS = []

if DEVELOPMENT_MODE is False:
    STATICFILES_STORAGE = "medical.storage.storage_backends.StaticStorage"


# Rest Framework
REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.IsAuthenticated"],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.TokenAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ],
    "DEFAULT_FILTER_BACKENDS": ("django_filters.rest_framework.DjangoFilterBackend",),
}


# Storage settings
MEDIA_ROOT = BASE_DIR / "uploads"
MEDIA_URL = "/uploads/"

DEFAULT_FILE_STORAGE = "storages.backends.s3boto3.S3Boto3Storage"
AWS_S3_REGION_NAME = "fra1"
AWS_S3_ENDPOINT_URL = f"https://fra1.digitaloceanspaces.com"
AWS_ACCESS_KEY_ID = os.environ.get("SPACES_KEY")
AWS_SECRET_ACCESS_KEY = os.environ.get("SPACES_SECRET")
AWS_STORAGE_BUCKET_NAME = os.environ.get("SPACES_BUCKET", "infocenter-test")
AWS_S3_FILE_OVERWRITE = False


# Other settings
LOGIN_REDIRECT_URL = "/"

ALLOWED_HOSTS = os.getenv("DJANGO_ALLOWED_HOSTS", "127.0.0.1,localhost").split(",")
CSRF_TRUSTED_ORIGINS = ["https://*.basic-fm.info", "https://*.127.0.0.1"]

AUTH_USER_MODEL = "accounts.User"
