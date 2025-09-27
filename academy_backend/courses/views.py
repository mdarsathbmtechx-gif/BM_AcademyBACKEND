from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Course
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import Http404
from django.conf import settings
from django.core.files.storage import default_storage
from datetime import datetime
from rest_framework.permissions import AllowAny
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from .serializers import CourseSerializer
from bson import ObjectId
from rest_framework.exceptions import NotFound
import os
import json


from rest_framework.views import APIView
from rest_framework.response import Response

class BannerListAPIView(APIView):
    def get(self, request):
        banners = [
            {"title": "Banner 1", "description": "Desc 1", "image": "url1"},
            {"title": "Banner 2", "description": "Desc 2", "image": "url2"},
        ]
        return Response(banners)


# ----------------------- Course List / Create -----------------------
class CourseListCreateAPIView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def get_full_image_url(self, image_file):
        if not image_file:
            return None
        try:
            filename = default_storage.save(f'courses/{image_file.name}', image_file)
            if filename:
                if settings.MEDIA_URL.startswith('/'):
                    return f"http://127.0.0.1:8000{settings.MEDIA_URL}{filename}"
                else:
                    return f"http://127.0.0.1:8000{settings.MEDIA_URL}/{filename}"
        except Exception as e:
            print(f"Error generating image URL: {e}")
        return None

    def get(self, request):
        try:
            courses = Course.objects.all()
            data = []
            for course in courses:
                data.append({
                    "_id": {"$oid": str(course.id)},
                    "title": course.title,
                    "description": course.description,
                    "mode": course.mode,
                    "duration": course.duration,
                    "price": float(course.price),
                    "enrolled_status": course.enrolled_status,
                    "modules": course.modules or [],
                    "image_url": course.image_url,
                    "created_at": {"$date": (course.created_at.isoformat() + "Z") if course.created_at else datetime.now().isoformat() + "Z"}
                })
            return Response(data)
        except Exception as e:
            print(f"Error fetching courses: {e}")
            import traceback; traceback.print_exc()
            return Response({'error': ['Failed to fetch courses']}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            title = request.data.get('title', '').strip()
            description = request.data.get('description', '').strip()
            mode = request.data.get('mode', 'Online').strip()
            duration = request.data.get('duration', 'Short-term').strip()
            price_str = request.data.get('price', '0').strip()
            enrolled_status = request.data.get('enrolled_status', 'Open').strip()

            # ------------------ Modules ------------------
            modules = request.data.getlist('modules') if hasattr(request.data, 'getlist') else request.data.get('modules', [])
            modules = [str(m).strip() for m in modules if m]

            # ------------------ Price Validation ------------------
            try:
                price = float(price_str)
                if price < 0:
                    return Response({'price': ['Price cannot be negative']}, status=status.HTTP_400_BAD_REQUEST)
            except ValueError:
                return Response({'price': ['A valid number is required']}, status=status.HTTP_400_BAD_REQUEST)

            # ------------------ Field Validation ------------------
            if not title: return Response({'title': ['This field is required']}, status=status.HTTP_400_BAD_REQUEST)
            if not description: return Response({'description': ['This field is required']}, status=status.HTTP_400_BAD_REQUEST)
            if mode not in ['Online', 'Offline']: return Response({'mode': ['Must be Online or Offline']}, status=status.HTTP_400_BAD_REQUEST)
            if duration not in ['Short-term', 'Long-term']: return Response({'duration': ['Must be Short-term or Long-term']}, status=status.HTTP_400_BAD_REQUEST)
            if enrolled_status not in ['Open', 'Closed', 'Ongoing']: return Response({'enrolled_status': ['Must be Open, Closed, or Ongoing']}, status=status.HTTP_400_BAD_REQUEST)

            # ------------------ Image ------------------
            image_file = request.FILES.get('image')
            image_url = self.get_full_image_url(image_file) if image_file else None

            # ------------------ Save ------------------
            course = Course(
                title=title, description=description, mode=mode, duration=duration,
                price=price, enrolled_status=enrolled_status, modules=modules, image_url=image_url
            )
            course.save()

            response_data = {
                "_id": {"$oid": str(course.id)},
                "title": course.title,
                "description": course.description,
                "mode": course.mode,
                "duration": course.duration,
                "price": float(course.price),
                "enrolled_status": course.enrolled_status,
                "modules": course.modules,
                "image_url": course.image_url,
                "created_at": {"$date": course.created_at.isoformat() + "Z"}
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(f"Error creating course: {e}")
            import traceback; traceback.print_exc()
            return Response({'error': [str(e)]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# ----------------------- Course Detail / Update / Delete -----------------------
class CourseDetailAPIView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [AllowAny]

    def get_object(self, pk):
        try:
            return Course.objects.get(id=pk)
        except Course.DoesNotExist:
            raise Http404

    def get_full_image_url(self, image_file):
        if not image_file:
            return None
        try:
            filename = default_storage.save(f'courses/{image_file.name}', image_file)
            if filename:
                if settings.MEDIA_URL.startswith('/'):
                    return f"http://127.0.0.1:8000{settings.MEDIA_URL}{filename}"
                else:
                    return f"http://127.0.0.1:8000{settings.MEDIA_URL}/{filename}"
        except Exception as e:
            print(f"Error generating image URL: {e}")
        return None

    def get(self, request, pk):
        try:
            course = self.get_object(pk)
            return Response({
                "_id": {"$oid": str(course.id)},
                "title": course.title,
                "description": course.description,
                "mode": course.mode,
                "duration": course.duration,
                "price": float(course.price),
                "enrolled_status": course.enrolled_status,
                "modules": course.modules,
                "image_url": course.image_url,
                "created_at": {"$date": course.created_at.isoformat() + "Z"}
            })
        except Http404:
            return Response({'error': ['Course not found']}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f"Error fetching course {pk}: {e}")
            import traceback; traceback.print_exc()
            return Response({'error': ['Failed to fetch course']}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, pk):
        try:
            course = self.get_object(pk)
            title = request.data.get('title', course.title).strip()
            description = request.data.get('description', course.description).strip()
            mode = request.data.get('mode', course.mode).strip()
            duration = request.data.get('duration', course.duration).strip()
            price_str = request.data.get('price', str(course.price)).strip()
            enrolled_status = request.data.get('enrolled_status', course.enrolled_status).strip()

            # Modules
            modules = request.data.getlist('modules') if hasattr(request.data, 'getlist') else request.data.get('modules', course.modules)
            modules = [str(m).strip() for m in modules if m]

            # Price validation
            try:
                price = float(price_str)
                if price < 0: return Response({'price': ['Price cannot be negative']}, status=status.HTTP_400_BAD_REQUEST)
            except ValueError:
                return Response({'price': ['A valid number is required']}, status=status.HTTP_400_BAD_REQUEST)

            # Field validation
            if not title: return Response({'title': ['This field is required']}, status=status.HTTP_400_BAD_REQUEST)
            if not description: return Response({'description': ['This field is required']}, status=status.HTTP_400_BAD_REQUEST)

            if mode not in ['Online', 'Offline']: return Response({'mode': ['Must be Online or Offline']}, status=status.HTTP_400_BAD_REQUEST)
            if duration not in ['Short-term', 'Long-term']: return Response({'duration': ['Must be Short-term or Long-term']}, status=status.HTTP_400_BAD_REQUEST)
            if enrolled_status not in ['Open', 'Closed', 'Ongoing']: return Response({'enrolled_status': ['Must be Open, Closed, or Ongoing']}, status=status.HTTP_400_BAD_REQUEST)

            # Handle image
            image_file = request.FILES.get('image')
            if image_file:
                # Delete old image
                if course.image_url and course.image_url.startswith('http://127.0.0.1:8000/media/'):
                    old_filename = course.image_url.replace('http://127.0.0.1:8000/media/', '')
                    old_path = os.path.join(settings.MEDIA_ROOT, old_filename)
                    if os.path.exists(old_path): os.remove(old_path)
                course.image_url = self.get_full_image_url(image_file)

            # Update fields
            course.title = title
            course.description = description
            course.mode = mode
            course.duration = duration
            course.price = price
            course.enrolled_status = enrolled_status
            course.modules = modules
            course.save()

            return Response({
                "_id": {"$oid": str(course.id)},
                "title": course.title,
                "description": course.description,
                "mode": course.mode,
                "duration": course.duration,
                "price": float(course.price),
                "enrolled_status": course.enrolled_status,
                "modules": course.modules,
                "image_url": course.image_url,
                "created_at": {"$date": course.created_at.isoformat() + "Z"}
            })
        except Http404:
            return Response({'error': ['Course not found']}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f"Error updating course {pk}: {e}")
            import traceback; traceback.print_exc()
            return Response({'error': [str(e)]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk):
        try:
            course = self.get_object(pk)
            if course.image_url and course.image_url.startswith('http://127.0.0.1:8000/media/'):
                filename = course.image_url.replace('http://127.0.0.1:8000/media/', '')
                path = os.path.join(settings.MEDIA_ROOT, filename)
                if os.path.exists(path): os.remove(path)
            course.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Http404:
            return Response({'error': ['Course not found']}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(f"Error deleting course {pk}: {e}")
            import traceback; traceback.print_exc()
            return Response({'error': ['Failed to delete course']}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# ----------------------- Retrieve / Update / Delete (Serializer version) -----------------------
class CourseRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    serializer_class = CourseSerializer

    def get_object(self):
        pk = self.kwargs.get('pk')
        try:
            return Course.objects.get(id=ObjectId(pk))
        except Exception:
            raise NotFound("Course not found")

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        data = request.data.copy()

        # Modules
        modules = data.getlist('modules') if hasattr(data, 'getlist') else data.get('modules', [])
        if not isinstance(modules, list):
            modules = [modules]

        # Update fields
        instance.title = data.get('title', instance.title)
        instance.description = data.get('description', instance.description)
        instance.mode = data.get('mode', instance.mode)
        instance.duration = data.get('duration', instance.duration)
        instance.price = float(data.get('price', instance.price))
        instance.enrolled_status = data.get('enrolled_status', instance.enrolled_status)
        instance.modules = modules

        # Image
        if 'image' in request.FILES:
            instance.image_url = default_storage.save(f'courses/{request.FILES["image"].name}', request.FILES['image'])

        instance.save()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)



# courses/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from courses.models import Course, Payment
import razorpay
from django.conf import settings

client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_order(request):
    try:
        course_id = request.data.get("course_id")
        user = request.user  # Authenticated user

        course = Course.objects(id=course_id).first()
        if not course:
            return Response({"error": "Course not found"}, status=404)

        amount = int(course.price * 100)
        order = client.order.create({
            "amount": amount,
            "currency": "INR",
            "payment_capture": 1
        })

        Payment.objects.create(
            user=str(user.id),
            course_id=str(course.id),
            razorpay_order_id=order["id"],
            amount=course.price,
            status="pending",
        )

        return Response({
            "order_id": order["id"],
            "amount": amount,
            "currency": "INR",
        })

    except Exception as e:
        return Response({"error": str(e)}, status=500)



# courses/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from courses.models import Payment
import razorpay
from django.conf import settings

client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def confirm_payment(request):
    try:
        payment_id = request.data.get("razorpay_payment_id")
        order_id = request.data.get("razorpay_order_id")
        signature = request.data.get("razorpay_signature")

        # Fetch payment record for this user
        payment = Payment.objects.filter(
            razorpay_order_id=order_id,
            user=str(request.user.id)
        ).first()

        if not payment:
            return Response({"error": "Payment record not found"}, status=404)

        # Verify Razorpay signature
        params_dict = {
            "razorpay_order_id": order_id,
            "razorpay_payment_id": payment_id,
            "razorpay_signature": signature,
        }

        try:
            client.utility.verify_payment_signature(params_dict)
            payment.razorpay_payment_id = payment_id
            payment.razorpay_signature = signature
            payment.status = "paid"
            payment.save()
            return Response({"message": "Payment successful"})
        except razorpay.errors.SignatureVerificationError:
            payment.status = "failed"
            payment.save()
            return Response({"error": "Payment verification failed"}, status=400)

    except Exception as e:
        return Response({"error": str(e)}, status=500)
