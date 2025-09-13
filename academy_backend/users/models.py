from mongoengine import Document, StringField
from werkzeug.security import generate_password_hash, check_password_hash

class User(Document):
    ROLE_CHOICES = ("student", "instructor", "admin")

    username = StringField(required=True, unique=True)
    email = StringField()
    password = StringField(required=True)
    role = StringField(choices=ROLE_CHOICES, default="student")

    def set_password(self, raw_password):
        self.password = generate_password_hash(raw_password)

    def check_password(self, raw_password):
        return check_password_hash(self.password, raw_password)

    def __str__(self):
        return f"{self.username} ({self.role})"
