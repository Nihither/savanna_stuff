from django.urls import path, include

from stuff.views.lessons_views import reminders, reports, lesson, lessons
from stuff.views.messages_views import messages
from stuff.views.students_views import students, student, student_lessons, student_cancelled_lessons, \
    student_extra_lessons
from stuff.views.teachers_views import teachers, teacher, teacher_lessons, teacher_extra_lessons, \
    teacher_cancelled_lessons


teachers_urls = [
    path('<int:teacher_id>', teacher),
    path('<int:teacher_id>/lessons', teacher_lessons),
    path('<int:teacher_id>/cancelled-lessons', teacher_cancelled_lessons),
    path('<int:teacher_id>/extra-lessons', teacher_extra_lessons),
]

students_urls = [
    path('<int:student_id>', student),
    path('<int:student_id>/lessons', student_lessons),
    path('<int:student_id>/cancelled-lessons', student_cancelled_lessons),
    path('<int:student_id>/extra-lessons', student_extra_lessons),
    path('<int:student_id>/messages', messages),
]

lessons_urls = [
    path('<int:lesson_id>', lesson)
]

urlpatterns = [
    path('reminders', reminders),
    path('reports', reports),
    path('students', students),
    path('teachers', teachers),
    path('lessons', lessons),
    path('teachers/', include(teachers_urls)),
    path('students/', include(students_urls)),
    path('lessons/', include(lessons_urls)),
]