import { format } from "date-fns";

export const convertDateFormat = (date: Date) => {
  return format(date, "yyyy-MM-dd hh:mm:ss");
};

export const convertDateFormatBR = (date: Date) => {
  const time = new Date(date);
  date.setDate(time.getDate() + 1);

  return format(date, "dd/MM/yyyy");
};
