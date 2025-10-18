from django.urls import path
from .views import (
    signup_api,
    login_api,
    google_login_api,
    profile_api,
    list_users,
    AdminLoginAPIView
)
from users import views
from .views import CreateTempAdminView


urlpatterns = [
    # Client / User endpoints
    path('signup/', signup_api, name='user-signup'),
    path('login/', login_api, name='user-login'),
    path('google-login/', google_login_api, name='google-login'),
    path('profile/', profile_api, name='profile'),
    path("list/", views.list_users, name="list_users"),

    # Admin endpoint
    path('admin/login/', AdminLoginAPIView.as_view(), name='admin-login'),
    path('create-temp-admin/', CreateTempAdminView.as_view(), name='create-temp-admin'),
    ]
