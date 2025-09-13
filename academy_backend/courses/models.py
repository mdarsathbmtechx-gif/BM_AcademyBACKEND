from mongoengine import Document, StringField, ReferenceField, DateTimeField
from users.models import User
import datetime

class Course(Document):
    title = StringField(required=True)
    description = StringField()
    instructor = ReferenceField(User)
    created_at = DateTimeField(default=datetime.datetime.utcnow)

class Enrollment(Document):
    user = ReferenceField(User)
    course = ReferenceField(Course)
    enrolled_at = DateTimeField(default=datetime.datetime.utcnow)
