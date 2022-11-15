export function getLastFragmentPath(path: string) {
  const routeArray = path.split("/");

  return routeArray[routeArray?.length - 1];
}
