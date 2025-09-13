from rest_framework import serializers
from .models import Course, Enrollment

class CourseSerializer(serializers.Serializer):
    title = serializers.CharField()
    description = serializers.CharField()

    def create(self, validated_data):
        user = self.context['request'].user
        course = Course(**validated_data, instructor=user)
        course.save()
        return course

class EnrollmentSerializer(serializers.Serializer):
    course_id = serializers.CharField()

    def create(self, validated_data):
        user = self.context['request'].user
        from .models import Course, Enrollment
        course = Course.objects(id=validated_data["course_id"]).first()
        if not course:
            raise serializers.ValidationError("Course not found")
        enrollment = Enrollment(user=user, course=course)
        enrollment.save()
        return enrollment
