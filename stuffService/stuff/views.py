from datetime import datetime, timedelta

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import *
from stuff.models import Lesson


@api_view(["GET"])
def reminders(request):
    if request.method == "GET":
        next_day = datetime.today() + timedelta(days=1)
        lessons = Lesson.objects.filter(day=next_day.weekday()).exclude(student__messages__reminder_is_required=False)
        if lessons:
            serializer = LessonSerializer(lessons, context={'request': request}, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(["GET"])
def reports(request):
    if request.method == "GET":
        today = datetime.today()
        lessons = Lesson.objects.filter(day=today.weekday())
        if lessons:
            serializer = LessonSerializer(lessons, context={'request': request}, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)