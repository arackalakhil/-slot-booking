from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from operator import mod
from django.db import models
# Create your models here.

class MyAccountManager(BaseUserManager):
    def create_user(self, first_name, last_name, username, email, password=None):
        if not email:
            raise ValueError('User must have an e-mail address')
        
        if not username:
            raise ValueError('User must have an Username')

        user = self.model(
            email       = self.normalize_email(email),
            username    = username,
            first_name  = first_name,
            last_name   = last_name
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    
    def create_superuser(self, first_name, last_name, username, email, password):
        user = self.create_user(
            email      = self.normalize_email(email),
            username   = username,
            password   = password,
            first_name = first_name,
            last_name  = last_name
        )
        user.is_admin   = True
        user.is_active  = True
        user.is_staff   = True
        user.is_superadmin  = True
        user.save(using=self._db)
        return user


class Account(AbstractBaseUser):
    first_name      = models.CharField(max_length=50)
    last_name       = models.CharField(max_length=50)
    username        = models.CharField(max_length=50, unique=True)
    email           = models.EmailField(max_length=100, unique=True)
    phone_number    = models.CharField(max_length=50,null=True)

    #Required fields

    date_joined     = models.DateTimeField(auto_now_add=True)  
    last_login      = models.DateTimeField(auto_now_add=True)  
    is_admin        = models.BooleanField(default=False)
    is_staff        = models.BooleanField(default=False)
    is_active       = models.BooleanField(default=True)
    is_superadmin   = models.BooleanField(default=False)





    USERNAME_FIELD      = 'username'
    REQUIRED_FIELDS     = ['email', 'first_name', 'last_name']

    objects = MyAccountManager()


    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, add_label):
        return True


class Booking(models.Model):
    Status=(
        ('PENDING','PENDING'),
        ('DECLINED','DECLINED'),
        ('APPROVED','APPROVED'),
            ) 
    user=models.ForeignKey(Account,on_delete=models.CASCADE,null=True)
    fullname=models.CharField(max_length=50,null=True)
    phone=models.IntegerField(null=True)
    company_name=models.CharField(max_length=500,null=True)
    city=models.CharField(max_length=50,null=True)
    state=models.CharField(max_length=50,null=True)
    email=models.CharField(max_length=50,null=True)
    address=models.CharField(max_length=500,null=True)
    image=models.ImageField(upload_to="images",null=True)
    approved= models.BooleanField(default=False)
    declined= models.BooleanField(default=False)
    pending= models.BooleanField(default=True)
    allotted= models.BooleanField(default=False)


    class Meta:
        verbose_name        = 'Booking'
        verbose_name_plural = 'Booking'
        
    def __str__(self):
        return str(self.company_name)


class BookingSlot(models.Model):
    booking     = models.ForeignKey(Booking, on_delete=models.SET_NULL, null=True, blank=True)
    room        = models.IntegerField(unique=True)
    is_booked   = models.BooleanField(default=False, null=True, blank=True) 

    def __str__(self):
        return str(self.booking)