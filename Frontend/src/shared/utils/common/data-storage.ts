export const getDataStorage = (key: string) => {
  return JSON.parse(JSON.stringify(sessionStorage.getItem(key)));
};

export const setDataStorage = (key: string, data: any) => {
  sessionStorage.setItem(key, JSON.stringify(data));
};

export const clearDataStorage = (key: string) => {
  sessionStorage.clear();
};
