from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer
from .models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny 

class SignupView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        data = request.data
        if User.objects(username=data.get("username")).first():
            return Response({"error": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "id": str(user.id),
                "username": user.username,
                "email": user.email
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        data = request.data
        user = User.objects(username=data.get("username")).first()
        if not user or not user.check_password(data.get("password")):
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        
        refresh = RefreshToken.for_user(user)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        })
