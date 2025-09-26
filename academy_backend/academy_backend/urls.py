from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin

urlpatterns = [
    # Courses API
    path('api/', include('courses.urls')),

    # Users API (signup, login, google-login, profile, admin login)
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
