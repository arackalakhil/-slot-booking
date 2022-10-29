from rest_framework.serializers import ModelSerializer
from account.models import Account, Booking, BookingSlot
from rest_framework import serializers

class AccountSerializer(ModelSerializer):
    class Meta:
        model = Account
        fields = ['id','first_name', 'last_name', 'username', 'email', 'password', 'is_admin' ]
        extra_kwargs = {'password': {'write_only': True}}
    def create(self, validated_data):
        user = Account.objects.create(
            username=validated_data["username"],
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
        )
        user.set_password(validated_data["password"])
        user.save()
        return user 

class NewBookingserializer(ModelSerializer):
    class Meta:
        model=Booking
        fields="__all__"
    pending=serializers.BooleanField(default=True)

class BookingSerializer(ModelSerializer):
    class Meta:
        model     = Booking
        fields = '__all__'
    

class SlotSerializer(ModelSerializer):
    class Meta:
        model = BookingSlot
        fields  = '__all__'
