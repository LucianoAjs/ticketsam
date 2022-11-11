import dateFormat from "dateformat";

export const convertDate = (dateBR: string) => {
  const splitDate = dateBR.split("/");

  const day = splitDate[0];
  const moth = splitDate[1];
  const year = splitDate[2];

  return dateFormat(new Date(`${year}-${moth}-${day}`), "yyyy-mm-dd");
};
