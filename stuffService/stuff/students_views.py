from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from stuff.stuff_serializers import *


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
        serializer = StudentModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(["GET", "PUT", "DELETE"])
def student(request, student_id):
    if request.method == "GET":
        student_obj = get_object_or_404(Student, pk=student_id)
        serializer = StudentModelSerializer(student_obj, context={'request': request}, many=False)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    elif request.method == "PUT":
        student_obj = get_object_or_404(Student, pk=student_id)
        serializer = StudentModelSerializer(instance=student_obj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        student_obj = get_object_or_404(Student, pk=student_id)
        student_obj.delete()
        return Response("Deleted", status=status.HTTP_200_OK)
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
