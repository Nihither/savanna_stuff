from datetime import datetime, timedelta
import requests

from stuffService.settings import env
from .models import Teacher, Student


def birthday_notification():
    bot_token = env('TG_BOT_TOKEN')
    if env('DJANGO_ENV') == "PROD":
        chat_id = env('TG_CHAT_ID_PROD')
    else:
        chat_id = env('TG_CHAT_ID_DEV')
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    date_today = datetime.today()
    text = ''
    for i in (1, 2):
        delta = timedelta(days=i)
        d = date_today + delta

        students = Student.objects.filter(birthday__month=d.month, birthday__day=d.day)
        if students:
            text = text + f'Дни рождения учеников {d.day} {d.strftime("%b")} \n\n'
            for student in students:
                text = text + f"{student.first_name} {student.last_name}\n" \
                              f"Контакт ученика: {student.phone}\n"
                if student.has_parent:
                    text = text + f"Родитель: {student.parent_first_name} {student.parent_last_name}\n" \
                              f"Контакт родителя: {student.parent_phone}\n\n"

        parents = Student.objects.filter(parent_birthday__month=d.month, parent_birthday__day=d.day)
        if parents:
            text = text + f'Дни рождения родителей {d.day} {d.strftime("%b")} \n\n'
            for student in parents:
                text = text + f"{student.parent_first_name} {student.parent_last_name}\n" \
                              f"Контакт: {student.parent_phone}\n\n"

        teachers = Teacher.objects.filter(birthday__month=d.month, birthday__day=d.day)
        if teachers:
            text = text + f'Дни рождения сотрудников {d.day} {d.strftime("%b")} \n\n'
            for teacher in teachers:
                text = text + f"{teacher.first_name} {teacher.last_name}\n" \
                              f"Контакт : {teacher.phone}\n\n"

    params = {
        'chat_id': chat_id,
        'text': text
    }
    if text:
        r = requests.post(url=url, params=params)
