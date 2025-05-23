from django.urls import path

from stuff.lessons_views import reminders, reports
from stuff.students_views import students, student, student_lessons
from stuff.teachers_views import teachers, teacher, teacher_lessons

urlpatterns = [
    path('reminders', reminders),
    path('reports', reports),
    path('teachers', teachers),
    path('students', students),
    path('teachers/<int:teacher_id>', teacher),
    path('students/<int:student_id>', student),
    path('teachers/<int:teacher_id>/lessons', teacher_lessons),
    path('students/<int:student_id>/lessons', student_lessons)
]