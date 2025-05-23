from datetime import datetime, timedelta

from django.db.models import Prefetch, Count, Q
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from stuff.serializers import *


@api_view(["GET"])
def reminders(request):
    if request.method == "GET":
        next_day = datetime.today() + timedelta(days=1)
        prefetch_lessons = Prefetch(
            'lessons',
            queryset=Lesson.objects.filter(day=next_day.weekday(), student__messages__reminder_is_required=True)
            .order_by('timestamp')
        )
        reminders_list = Teacher.objects.prefetch_related(prefetch_lessons) \
            .annotate(les_count=Count('lessons', filter=Q(lessons__day=next_day.weekday(),
                                                          lessons__student__messages__reminder_is_required=True))) \
            .filter(les_count__gt=0)
        if reminders_list:
            serializer = TeacherWithLessonsFullDepthSerializer(reminders_list, context={'request': request}, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(["GET"])
def reports(request):
    if request.method == "GET":
        today = datetime.today()
        lessons = Lesson.objects.filter(day=today.weekday()).order_by('timestamp')
        if lessons:
            serializer = LessonFullDepthSerializer(lessons, context={'request': request}, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
