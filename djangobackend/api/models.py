from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, username, password):
        if not username or not password:
            raise ValueError('Users must have a username and password')
        user = self.model(username=username)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password):
            user = self.create_user(username, password=password)
            user.is_admin = True
            user.is_superuser = True
            user.save(using=self._db)
            return user

class User(AbstractBaseUser):
    username = models.CharField(max_length=64, unique=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin

class Game(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    num = models.IntegerField()
    c0 = models.IntegerField()
    c1 = models.IntegerField()
    c2 = models.IntegerField()
    c3 = models.IntegerField()
    c4 = models.IntegerField()
    c5 = models.IntegerField()
    c6 = models.IntegerField()
    c7 = models.IntegerField()
    c8 = models.IntegerField()
    gameName = models.CharField(max_length=64)
    gamescol = models.IntegerField()


