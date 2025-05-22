from datetime import datetime, timedelta

from django.db.models import Prefetch, Count, Q
from rest_framework.decorators import api_view
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework import status

from .serializers import *
from stuff.models import Lesson


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


@api_view(["GET", "POST"])
def teachers(request):
    if request.method == "GET":
        teachers_list = Teacher.objects.all()
        if teachers_list:
            serializer = TeacherModelSerializer(teachers_list, context={'request': request}, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.nethod == "POST":
        return Response(status=status.HTTP_201_CREATED)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(["GET", "POST"])
def students(request):
    if request.method == "GET":
        students_list = Student.objects.all()
        if students_list:
            serializer = StudentModelSerializer(students_list, context={'request': request}, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == "POST":
        return Response(status=status.HTTP_201_CREATED)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(["GET", "PUT", "DELETE"])
def teacher(request, teacher_id):
    if request.method == "GET":
        teacher_obj = get_object_or_404(Teacher, pk=teacher_id)
        serializer = TeacherModelSerializer(teacher_obj, context={'request': request}, many=False)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    elif request.method == "PUT":
        return Response(status=status.HTTP_200_OK)
    elif request.method == "DELETE":
        teacher_obj = get_object_or_404(Teacher, pk=teacher_id)
        teacher_obj.delete()
        return Response("Deleted", status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(["GET", "PUT", "DELETE"])
def student(request, student_id):
    if request.method == "GET":
        student_obj = get_object_or_404(Student, pk=student_id)
        serializer = StudentModelSerializer(student_obj, context={'request': request}, many=False)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    elif request.method == "PUT":
        return Response(status=status.HTTP_200_OK)
    elif request.method == "DELETE":
        student_obj = get_object_or_404(Student, pk=student_id)
        student_obj.delete()
        return Response("Deleted", status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(["GET"])
def teacher_lessons(request, teacher_id):
    if request.method == "GET":
        teacher_obj = get_object_or_404(Teacher, pk=teacher_id)
        lessons = Lesson.objects.filter(teacher=teacher_obj)
        if lessons:
            serializer = LessonsByTeacherSerializer(lessons, context={'request': request}, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(["GET"])
def student_lessons(request, student_id):
    if request.method == "GET":
        student_obj = get_object_or_404(Student, pk=student_id)
        lessons = Lesson.objects.filter(student=student_obj)
        if lessons:
            serializer = LessonsByStudentSerializer(lessons, context={'request': request}, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
