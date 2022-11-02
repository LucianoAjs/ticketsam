export function debounce(
  func: Function,
  wait: number,
  id: string,
  timers: any = {}
) {
  clearTimeout(timers[id]);
  timers[id] = setTimeout(func, wait);
}
