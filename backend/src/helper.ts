export const timeToDate = (dayOfWeek: string, timeStr: string): Date => {
  const date = new Date();

  const currentDay = date.getDay();

  let targetDay = 0;

  switch (dayOfWeek.toLowerCase()) {
    case "sunday":
      targetDay = 0;
      break;
    case "monday":
      targetDay = 1;
      break;
    case "tuesday":
      targetDay = 2;
      break;
    case "wednesday":
      targetDay = 3;
      break;
    case "thursday":
      targetDay = 4;
      break;
    case "friday":
      targetDay = 5;
      break;
    case "saturday":
      targetDay = 6;
      break;
    default:
      throw "day of week is not valid! given day of week";
  }

  const difference = targetDay - currentDay;

  date.setDate(date.getDate() + difference);

  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  date.setHours(hours, minutes, 0, 0);
  return date;
};

export const datetimeToDate = (datetimeStr: string): Date => {
  const date = new Date(datetimeStr);
  const [time, modifier] = datetimeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  date.setHours(hours, minutes, 0, 0);
  return date;
};
