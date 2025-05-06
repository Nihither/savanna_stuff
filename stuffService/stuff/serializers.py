from rest_framework import serializers

from stuff.models import Teacher, Student, Lesson, Message


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = "__all__"


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('reminder_is_required', 'reminder_message', 'report_is_required', 'report_message')


class StudentSerializer(serializers.ModelSerializer):
    messages = MessageSerializer()

    class Meta:
        model = Student
        fields = "__all__"


class LessonSerializer(serializers.ModelSerializer):
    teacher = TeacherSerializer()
    student = StudentSerializer()

    class Meta:
        model = Lesson
        fields = "__all__"
