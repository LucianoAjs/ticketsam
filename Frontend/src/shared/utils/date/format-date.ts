import { format } from "date-fns";
import { parseDate } from "./parse-date";

export function formatDate(date: string) {
  try {
    const result = parseDate(date);
    return new Date(format(result, "yyyy-MM-dd")).toISOString();
  } catch (error) {
    return "";
  }
}
