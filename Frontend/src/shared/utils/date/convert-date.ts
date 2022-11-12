export const convertDate = (dateBR: string) => {
  const splitDate = dateBR.split("/");

  const year = splitDate[0];
  const day = splitDate[2];
  const month = splitDate[1];

  return `${year}-${month}-${day}`;
};
