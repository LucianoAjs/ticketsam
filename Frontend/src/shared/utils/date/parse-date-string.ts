import { parseDate } from "./parse-date";

export function parseDateString(_value: string, originalValue: string) {
  try {
    return parseDate(originalValue);
  } catch (error) {
    return "";
  }
}
