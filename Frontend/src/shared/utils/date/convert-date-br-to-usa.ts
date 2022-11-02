export const convertDateFormatInUS = (dateBR: string) => {
  const splitDate = dateBR.split("/");

  const day = splitDate[0];
  const moth = splitDate[1];
  const year = splitDate[2];

  return `${year}-${moth}-${day}`;
};
