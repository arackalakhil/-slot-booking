from django.conf import settings
from django.urls import path
from . import views
from .views import  AllBookingList, ApproveView, ApprovedList, DeclinedList, DeclinedView, MyTokenObtainPairView, NewBooking, RegisterUser, SlotList
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('', views.getRoutes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register', RegisterUser.as_view()),
    path('booking',NewBooking.as_view()),
    path('allbooking',AllBookingList.as_view()),
    path('approveview/<int:id>',ApproveView.as_view()),
    path('declineview/<int:id>',DeclinedView.as_view()),
    path('approvedlist',ApprovedList.as_view()),
    path('declinedlist',DeclinedList.as_view()),
    path('slotlist',SlotList.as_view()),
    path('CreateSlot', views.CreateSlot.as_view()),
    path('bookslot/<int:id>', views.BookSlot.as_view()),
    path('userdata', views.UserData.as_view()),
    path('usermanipulation/<int:id>', views.UserManipulation.as_view()),

]+static(settings.MEDIA_URL,documnet_root=settings.MEDIA_ROOT)
