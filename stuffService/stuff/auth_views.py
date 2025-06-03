from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from stuff.auth_serializers import LoginSerializer

from django.contrib.auth.views import PasswordResetView


@api_view(["POST"])
@permission_classes([AllowAny])
def signin(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = authenticate(
        username=request.data['username'],
        password=request.data['password']
    )
    if not user:
        return Response(status=401)
    login(request, user=user)
    token, _ = Token.objects.get_or_create(user=user)
    return Response(status=status.HTTP_200_OK, data={
        **serializer.data,
        'token': token.key,
    })


@api_view(["GET"])
def signout(request):
    request.user.auth_token.delete()
    logout(request)
    return Response(status=status.HTTP_200_OK)


@api_view(["PUT"])
def pass_change(request):
    if request.user.check_password(request.data['current_password']):
        try:
            validate_password(request.data['new_password'])
            request.user.set_password(request.data['new_password'])
            request.user.save()
            return Response(status=status.HTTP_200_OK)
        except ValidationError as error:
            return Response(data={"detail": error.messages[0]}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(data={"detail": "Текущий пароль указан неверно"}, status=status.HTTP_400_BAD_REQUEST)
