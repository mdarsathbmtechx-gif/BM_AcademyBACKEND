from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Course, Enrollment
from .serializers import CourseSerializer, EnrollmentSerializer

class CourseListView(APIView):
    def get(self, request):
        courses = Course.objects()
        data = [{"id": str(c.id), "title": c.title, "description": c.description,
                 "instructor": c.instructor.username} for c in courses]
        return Response(data)

class CourseCreateView(APIView):
    def post(self, request):
        serializer = CourseSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            course = serializer.save()
            return Response({"id": str(course.id), "title": course.title, "description": course.description}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EnrollmentView(APIView):
    def post(self, request):
        serializer = EnrollmentSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            enrollment = serializer.save()
            return Response({"id": str(enrollment.id), "course": str(enrollment.course.id)}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        enrollments = Enrollment.objects(user=request.user)
        data = [{"id": str(e.id), "course": {"id": str(e.course.id), "title": e.course.title}} for e in enrollments]
        return Response(data)
