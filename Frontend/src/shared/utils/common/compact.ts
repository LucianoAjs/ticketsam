export function compact(o: any): any {
  if (!o) {
    return o;
  }
  Object.keys(o).forEach((k) => {
    if (!o[k]) {
      delete o[k];
    } else if (typeof o[k] === "object") {
      o[k] = compact(o[k]);

      if (Object.keys(o[k]).length === 0) {
        delete o[k];
      }
    } else if (Array.isArray(o[k])) {
      o[k] = o[k].map(compact);
    } else if (o[k] === "undefined") {
      delete o[k];
    }
  });

  return o;
}
