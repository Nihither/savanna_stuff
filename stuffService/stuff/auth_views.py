from django.contrib.auth import authenticate, login
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from stuff.auth_serializers import LoginSerializer


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
