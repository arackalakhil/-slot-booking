from django.contrib import admin
from .models import Account, Booking, BookingSlot

# Register your models here.
admin.site.register(Account)
admin.site.register(Booking)
admin.site.register(BookingSlot)
