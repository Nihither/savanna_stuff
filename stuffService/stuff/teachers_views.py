from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from stuff.serializers import *


@api_view(["GET", "POST"])
def teachers(request):
    if request.method == "GET":
        teachers_list = Teacher.objects.all()
        if teachers_list:
            serializer = TeacherModelSerializer(teachers_list, context={'request': request}, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == "POST":
        serializer = TeacherModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(["GET", "PUT", "DELETE"])
def teacher(request, teacher_id):
    if request.method == "GET":
        teacher_obj = get_object_or_404(Teacher, pk=teacher_id)
        serializer = TeacherModelSerializer(teacher_obj, context={'request': request}, many=False)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    elif request.method == "PUT":
        teacher_obj = get_object_or_404(Teacher, pk=teacher_id)
        serializer = TeacherModelSerializer(instance=teacher_obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        teacher_obj = get_object_or_404(Teacher, pk=teacher_id)
        teacher_obj.delete()
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
