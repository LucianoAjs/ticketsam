import { format } from "date-fns";

export const convertDateFormat = (date: Date) => {
  return format(date, "yyyy-MM-dd hh:mm:ss");
};
