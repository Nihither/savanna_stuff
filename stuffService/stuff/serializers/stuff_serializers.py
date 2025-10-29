from rest_framework import serializers

from stuff.models import Teacher, Student, Lesson, Message, CancelledLesson, ExtraLesson


class TeacherModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = "__all__"


class MessageModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['reminder_is_required', 'reminder_message', 'report_is_required', 'report_message']


class StudentModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = "__all__"


class LessonModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = "__all__"


class StudentWithMessageSerializer(serializers.ModelSerializer):
    messages = MessageModelSerializer()

    class Meta:
        model = Student
        fields = "__all__"


class LessonsByTeacherSerializer(serializers.ModelSerializer):
    student = StudentModelSerializer()

    class Meta:
        model = Lesson
        fields = ['pk', 'student', 'day', 'timestamp']


class LessonsByStudentSerializer(serializers.ModelSerializer):
    teacher = TeacherModelSerializer()

    class Meta:
        model = Lesson
        fields = ['pk', 'teacher', 'day', 'timestamp']


class LessonWithParticipantsSerializer(serializers.ModelSerializer):
    teacher = TeacherModelSerializer()
    student = StudentModelSerializer()

    class Meta:
        model = Lesson
        fields = "__all__"


class CancelledLessonSerializer(serializers.ModelSerializer):
    lesson = LessonWithParticipantsSerializer()

    class Meta:
        model = CancelledLesson
        fields = "__all__"


class ExtraLessonSerializer(serializers.ModelSerializer):
    teacher = TeacherModelSerializer()
    student = StudentModelSerializer()
    cancelled_lesson = CancelledLessonSerializer()

    class Meta:
        model = ExtraLesson
        fields = "__all__"


class LessonFullDepthSerializer(serializers.ModelSerializer):
    teacher = TeacherModelSerializer()
    student = StudentWithMessageSerializer()

    class Meta:
        model = Lesson
        fields = "__all__"


class LessonsByTeacherWithMessageSerializer(serializers.ModelSerializer):
    student = StudentWithMessageSerializer()

    class Meta:
        model = Lesson
        fields = ['pk', 'student', 'day', 'timestamp']


class TeacherWithLessonsFullDepthSerializer(serializers.ModelSerializer):
    lessons = LessonsByTeacherWithMessageSerializer(many=True)

    class Meta:
        model = Teacher
        fields = "__all__"
