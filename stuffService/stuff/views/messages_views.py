from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from stuff.models import Message
from stuff.serializers.stuff_serializers import MessageModelSerializer


@api_view(["GET", "PUT"])
def messages(request, student_id):
    if request.method == "GET":
        message = get_object_or_404(Message, student__pk=student_id)
        serializer = MessageModelSerializer(instance=message, context={'request': request}, many=False)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    elif request.method == "PUT":
        message = get_object_or_404(Message, student__pk=student_id)
        serializer = MessageModelSerializer(instance=message, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
