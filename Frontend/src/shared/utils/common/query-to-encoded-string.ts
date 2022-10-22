import { compact } from "..";

export function queryToEncodedString(query: any) {
  compact(query);
  const array: string[] = [];

  if (typeof query !== "object" || !query) {
    return "";
  }

  Object.entries(query).forEach((element) => {
    if (Array.isArray(element[1])) {
      element[1].forEach((o) =>
        array.push(`${element[0]}=${encodeURIComponent(o)}`)
      );
    } else {
      array.push(`${element[0]}=${encodeURIComponent(element[1] as string)}`);
    }
  });

  return array.length > 0 ? `?${array.join("&")}` : "";
}
