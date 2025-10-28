from django.contrib import admin

from stuff.models import Teacher, Student, Lesson, Message, CancelledLesson, ExtraLesson


class LessonInline(admin.StackedInline):
    model = Lesson


class MessageInline(admin.StackedInline):
    model = Message


class TeacherAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'phone']
    inlines = [LessonInline]


class StudentAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'parent_first_name', 'parent_last_name']
    inlines = [LessonInline, MessageInline]


class LessonAdmin(admin.ModelAdmin):
    list_display = ['teacher', 'student', 'day']


admin.site.register(Teacher, TeacherAdmin)
admin.site.register(Student, StudentAdmin)
admin.site.register(Lesson, LessonAdmin)
admin.site.register(Message)
admin.site.register(CancelledLesson)
admin.site.register(ExtraLesson)
