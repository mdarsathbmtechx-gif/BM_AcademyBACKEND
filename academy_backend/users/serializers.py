from rest_framework import serializers
from .models import User

class UserSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField(required=False)
    password = serializers.CharField(write_only=True)
    role = serializers.CharField(default="student")

    def create(self, validated_data):
        user = User(
            username=validated_data["username"],
            email=validated_data.get("email", ""),
            role=validated_data.get("role", "student"),
        )
        user.set_password(validated_data["password"])
        user.save()
        return user
