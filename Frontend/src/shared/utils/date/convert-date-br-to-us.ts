export const convertDateFormatBrToUs = (dateBR: string) => {
  const splitDate = dateBR.split("/");

  const year = splitDate[2];
  const day = splitDate[0];
  const month = splitDate[1];

  return `${year}-${month}-${day}`;
};
