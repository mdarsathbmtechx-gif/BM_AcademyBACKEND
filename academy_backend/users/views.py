from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from .models import User
from .serializers import UserLoginSerializer
from .utils import create_jwt  # function to create JWT
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import jwt
import datetime
import json

# JWT secret
JWT_SECRET = "72e55c024d5279e91a73db4df975f81bb6cd98c4d782087c60f50d510c0f114f"
CLIENT_ID = "281995264661-p0jsb5s26huk2auv0krl7nc28e3jmk26.apps.googleusercontent.com"


def generate_jwt(user):
    payload = {
        "user_id": str(user.id),
        "email": user.email,
        "role": user.role,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7),
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")
    return token


# ----------------- User Signup -----------------
@csrf_exempt
def signup_api(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=400)

    data = json.loads(request.body)
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    phone = data.get("phone")

    if not name or not email or not password or not phone:
        return JsonResponse({"error": "Name, email, phone, and password are required"}, status=400)

    if User.objects(email=email).first():
        return JsonResponse({"error": "Email already registered"}, status=400)

    user = User(name=name, email=email, phone=phone)
    user.set_password(password)
    user.role = "client"
    user.save()

    return JsonResponse({"message": "Signup successful"})


# ----------------- User / Admin Login -----------------
@csrf_exempt
def login_api(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=400)

    data = json.loads(request.body)
    email = data.get("email")
    password = data.get("password")
    role = data.get("role", "client")  # optional: "admin" or "client"

    user = User.objects(email=email, role=role).first()
    if not user or not user.check_password(password):
        return JsonResponse({"error": "Invalid credentials"}, status=401)

    token = generate_jwt(user)
    return JsonResponse({
        "token": token,
        "user": {
            "email": user.email,
            "role": user.role
        }
    })


# ----------------- Google Login -----------------
from django.conf import settings
import secrets

@csrf_exempt
def google_login_api(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST method required"}, status=400)

    try:
        body = json.loads(request.body)
        token = body.get("token")
        if not token:
            return JsonResponse({"error": "Token missing"}, status=400)

        # Verify token with Google
        idinfo = id_token.verify_oauth2_token(
            token, google_requests.Request(), settings.GOOGLE_CLIENT_ID
        )

        email = idinfo.get("email")
        name = idinfo.get("name", "Unknown")
        if not email:
            return JsonResponse({"error": "Email not found in token"}, status=400)

        # Get or create user
        user = User.objects(email=email).first()
        if not user:
            user = User(
                email=email,
                name=name,
                role="client",
                phone="0000000000"
            )
            import secrets
            user.set_password(secrets.token_urlsafe(16))  # random password
            user.save()

        jwt_token = generate_jwt(user)
        return JsonResponse({
            "access": jwt_token,
            "user": {"email": user.email, "name": user.name, "role": user.role}
        })

    except ValueError as e:
        return JsonResponse({"error": f"Invalid Google token: {str(e)}"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


# ----------------- Profile -----------------
from .decorators import jwt_required

@jwt_required
def profile_api(request):
    user = request.user
    return JsonResponse({"email": user.email, "role": user.role})


# ----------------- Admin Login DRF Style -----------------
from django.contrib.auth import authenticate
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

class AdminLoginAPIView(APIView):
    permission_classes = [AllowAny]  # public endpoint

    def post(self, request):
        import json
        data = json.loads(request.body)
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return JsonResponse({"error": "Email and password required"}, status=400)

        # Authenticate admin user
        user = authenticate(username=email, password=password)

        # Ensure it's an admin (superuser or staff)
        if user is None or not user.is_staff:
            return JsonResponse({"detail": "Admin not found or invalid credentials"}, status=404)

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        return JsonResponse({
            "message": "Admin login successful",
            "access": access_token,
            "refresh": str(refresh),
            "admin": {
                "email": user.email,
                "is_staff": user.is_staff,
                "is_superuser": user.is_superuser
            }
        })




from django.http import JsonResponse
from users.models import User

def list_users(request):
    if request.method == "GET":
        users = User.objects.all()  
        users_list = [
            {
                "id": str(user.id),
                "name": getattr(user, "name", ""),
                "email": user.email,
                "phone": getattr(user, "phone", ""),
            }
            for user in users
        ]
        return JsonResponse(users_list, safe=False)




from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from .models import User  # <-- MongoEngine User model

@method_decorator(csrf_exempt, name='dispatch')
class CreateTempAdminView(View):
    def post(self, request):
        import json
        data = json.loads(request.body)
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return JsonResponse({"error": "Email and password required"}, status=400)

        if User.objects(email=email, role="admin").first():
            return JsonResponse({"error": "Admin already exists"}, status=400)

        # Create admin in MongoEngine
        user = User(email=email, role="admin", name="Temp Admin", phone="0000000000")
        user.set_password(password)
        user.save()

        return JsonResponse({"status": "Admin created successfully"})
