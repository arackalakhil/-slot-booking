from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
import json
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from account.models import Account, Booking, BookingSlot
from base.api import serializers

from base.api.serializers import AccountSerializer, BookingSerializer, NewBookingserializer, SlotSerializer
from rest_framework import status
from rest_framework import mixins,generics



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims

        token['username'] = user.username
        token['is_superadmin']=user.is_superadmin
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterUser(APIView):
    def post(self, request):
        user=AccountSerializer(data=request.data)
        print(user)
        print(request.data)
        if user.is_valid():
            print('koooooooii')
            user.save()
            print("heyyy")
            return Response(user.data,status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)




# class NewBooking(APIView):
#     permission_classes=[IsAuthenticated]
#     def post(self,request):
#         print(request.user)
#         data=request.data

#         booking=Booking(fullname=data['fullname'],
            

#             phone=data['phone'],
#             email=data['email'],
#             city=data['city'],
#             state=data['state'],
#             company_name=data['company_name'],
#             address=data['address'])
#         booking.save() 
#         print(booking)
#         return Response(status=200)


class NewBooking(APIView):
    def post(self,request):
        print(request.data)
        booking=NewBookingserializer(data=request.data)
        print("Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        if booking.is_valid():
            booking.save()
            return Response(status=200)
        else:
            data=booking.errors
            return Response(status=status.HTTP_404_NOT_FOUND)




class AllBookingList(APIView):

    def get(self, request):
        booking=Booking.objects.filter(pending=True,approved=False,declined=False)
        list=BookingSerializer(booking,many =True)

        if list:
            return Response(list.data,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)
          



class ApproveView(APIView):
    def post (self,request,id):
        print("fffffffffffffffffffffffffffffffffffffffff")

        booking = Booking.objects.get(id=id)
        booking.approved=True
        booking.pending=False
        booking.save()
        print("oooooooooooooooooooooooooooooooooooooooo")

        test = Booking.objects.filter(approved=True)
        print(test)
        sample = BookingSerializer(test, many=True)        
        return Response(sample.data, status=status.HTTP_200_OK)

class DeclinedView(APIView):
    def post (self,request,id):

        booking = Booking.objects.get(id=id)
        booking.approved=False
        booking.pending=False
        booking.declined=True
        booking.save()

        print("ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss")
        test = Booking.objects.filter(declined=True)
        sample = BookingSerializer(test, many=True)        
        return Response(sample.data, status=status.HTTP_200_OK)


class ApprovedList(APIView):
    def get(self, request):
        booking=Booking.objects.filter(pending=False,approved=True,declined=False)
        list=BookingSerializer(booking,many =True)
        
        if list:
            return Response(list.data,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)



# class ApprovedList(mixins.ListModelMixin,generics.GenericAPIView):
#     booking=Booking.objects.filter(pending=False,approved=True,declined=False)
#     serializer_class=BookingSerializer
#     def get(self,request):
#         print("ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss")
#         return self.list(request)




class DeclinedList(APIView):
    def get(self,request):
        booking=Booking.objects.filter(pending=False,approved=False,declined=True)
        list=BookingSerializer(booking,many =True)
        print("ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo")
        if list:
            return Response(list.data,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


class SlotList(APIView):
    def get(self,request):
        slots = BookingSlot.objects.all()
        bookingSlot = SlotSerializer(slots,many = True)

        if bookingSlot:
            return Response(bookingSlot.data,status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)




class CreateSlot(APIView):
    def post(self,request):
        data = request.data
        newSlot = BookingSlot(room = data["room_number"])
        newSlot.save()
        return Response(status.HTTP_200_OK)


class BookSlot(APIView):
    def post(self,request,id):
        data =request.data
        slot=BookingSlot.objects.get(id=id)
        booking=Booking.objects.get(id=data["booking"])
        booking.allotted=True
        booking.pending=False
        booking.approved = False
        booking.save()
        slot.is_booked =True
        slot.booking = booking
        slot.save()
        return Response(status.HTTP_200_OK)


class UserData(APIView):
    def get(self,request):
        account=Account.objects.all()
        list=AccountSerializer(account,many=True)
        if list:
            return Response(list.data,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)


# class UserData(mixins.ListModelMixin,generics.GenericAPIView):
#     account=Account.objects.all()
    
#     serializer_class=AccountSerializer
#     print("pppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp")
#     def get(self,request):
#         print(";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;kkkkkkkkk")
#         return self.list(request)

class UserManipulation(APIView):
    def delete(self,request,id):
        try:
            account=Account.objects.get(id=id)
            account.delete()
            return Response(status=status.HTTP_200_OK)

        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)

            






@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]

    return Response(routes)


