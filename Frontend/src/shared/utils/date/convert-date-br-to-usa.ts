export const convertDateFormatInBR = (dateBR: string) => {
  const splitDate = dateBR.split("/");

  const year = splitDate[0];
  const moth = splitDate[1];
  const day = splitDate[2];

  return `${day}/${moth}/${year}`;
};
