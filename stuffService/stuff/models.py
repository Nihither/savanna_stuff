from django.db import models


class Teacher(models.Model):
    first_name = models.CharField(verbose_name="Имя", max_length=40, blank=False, null=False)
    last_name = models.CharField(verbose_name="Фамилия", max_length=30, blank=True, null=True)
    birthday = models.DateField(verbose_name="День рождения", blank=True, null=True)
    phone = models.CharField(verbose_name="Телефон", max_length=15, blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Student(models.Model):
    first_name = models.CharField(verbose_name="Имя", max_length=40, blank=False, null=False)
    last_name = models.CharField(verbose_name="Фамилия", max_length=30, blank=True, null=True)
    birthday = models.DateField(verbose_name="День рождения", blank=True, null=True)
    phone = models.CharField(verbose_name="Телефон", max_length=15, blank=True, null=True)
    has_parent = models.BooleanField(verbose_name="Есть контактное лицо", default=True)
    parent_first_name = models.CharField(verbose_name="Имя родителя", max_length=40, blank=True, null=True)
    parent_last_name = models.CharField(verbose_name="Фамилия родителя", max_length=30, blank=True, null=True)
    parent_birthday = models.DateField(verbose_name="День рождения родителя", blank=True, null=True)
    parent_phone = models.CharField(verbose_name="Телефон родителя", max_length=15, blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def save(self, *args, **kwargs):
        if not self.pk:
            super(Student, self).save(*args, **kwargs)
            new_messages = Message()
            new_messages.student = self
            new_messages.save()
        else:
            super(Student, self).save(*args, **kwargs)


class Lesson(models.Model):
    WEEKDAYS = (
        (0, "ПН"),
        (1, "ВТ"),
        (2, "СР"),
        (3, "ЧТ"),
        (4, "ПТ"),
        (5, "СБ"),
        (6, "ВС")
    )
    teacher = models.ForeignKey(to=Teacher, on_delete=models.CASCADE, blank=True, null=True,
                                related_name="lessons", verbose_name="Преподаватель")
    student = models.ForeignKey(to=Student, on_delete=models.CASCADE, blank=True, null=True,
                                related_name="lessons", verbose_name="Ученик")
    day = models.SmallIntegerField(verbose_name="День недели", choices=WEEKDAYS)
    timestamp = models.TimeField(verbose_name="Время")

    def __str__(self):
        return f"{self.teacher} {self.student} {self.day}"


class Message(models.Model):
    reminder_is_required = models.BooleanField(verbose_name="Нужно ли напоминать?", default=True)
    reminder_message = models.TextField(verbose_name="Текст для напоминания",
                                        default="Добрый день.\r\n"
                                                "Напоминаем об уроке завтра date в time")
    report_is_required = models.BooleanField(verbose_name="Нужно ли сообщать о проведении?", default=True)
    report_message = models.TextField(verbose_name="Текст для отчета",
                                      default="""Добрый день.\r\nУрок провели.\r\nОсталось i оплаченных занятий из n""")
    student = models.OneToOneField(to=Student, on_delete=models.CASCADE, related_name="messages", blank=False,
                                   null=False)

    def __str__(self):
        return f"Шаблоны сообщений для {self.student}"