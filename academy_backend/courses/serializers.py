# courses/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Course, Enrollment

User = get_user_model()

# ----- User Serializer -----
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data.get('email', '')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

# ----- Course Serializer -----
class CourseSerializer(serializers.ModelSerializer):
    instructor = serializers.StringRelatedField(read_only=True)  # show username

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'instructor', 'created_at']

# ----- Enrollment Serializer -----
class EnrollmentSerializer(serializers.ModelSerializer):
    student = serializers.StringRelatedField(read_only=True)
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())

    class Meta:
        model = Enrollment
        fields = ['id', 'student', 'course', 'enrolled_at']
