from django.urls import path

from .views import reminders, reports, teachers, students, teacher, student, teacher_lessons, student_lessons

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