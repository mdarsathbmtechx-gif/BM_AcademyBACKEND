# users/models.py
from mongoengine import Document, StringField
from werkzeug.security import generate_password_hash, check_password_hash

class User(Document):
    name = StringField(required=True)           # <-- added
    email = StringField(required=True, unique=True)
    phone = StringField(required=True)          # <-- added
    password_hash = StringField(required=True)
    role = StringField(choices=["admin", "client", "student"], default="client")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
