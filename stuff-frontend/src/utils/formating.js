

export function getFullName(person) {
  if (person.last_name) {
    return person.first_name + " " + person.last_name;
  } else if (person.parent_first_name) {
    return person.first_name + " " + person.parent_first_name +
      (person.parent_last_name ? " " + person.parent_last_name : "");
  } else {
    return person.first_name;
  }
}

export function getFormatedDay(day) {
  switch (day) {
    case 0: return "ПН";
    case 1: return "ВТ";
    case 2: return "СР";
    case 3: return "ЧТ";
    case 4: return "ПТ";
    case 5: return "СБ";
    case 6: return "ВС";
  }
}

export function getFormatedTime(time) {
//   time is hh:mm:ss string
  return time.substring(0, time.lastIndexOf(':'))
}

export function formatDateTime(day, time) {
  const formated_day = getFormatedDay(day)
  const formated_time = getFormatedTime(time)
  return `${formated_day} ${formated_time}`;
}

export function formatDateFromString(date) {
  const date_ = new Date(date).toLocaleDateString();
  return date_.substring(0, date_.lastIndexOf('.'));
}

export function getFormatedReminderMessage(message, time) {
  const formated_time = getFormatedTime(time)
  const tomorrow_date = new Date(Date.now() + 24 * 60 * 60 * 1000)
  const formated_tomorrow = formatDateFromString(tomorrow_date)
  message = message.replace("dd.mm", formated_tomorrow)
  message = message.replace("hh:MM", formated_time)
  return message
}