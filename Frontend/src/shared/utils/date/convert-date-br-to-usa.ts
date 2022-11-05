import dateFormat from "dateformat";

export const convertDateFormatInUS = (dateBR: string) => {
  const splitDate = dateBR.split("/");

  const day = splitDate[0];
  const moth = splitDate[1];
  const year = splitDate[2];

  return dateFormat(
    new Date(`${year}-${moth}-${day} 00:00:00`),
    "yyyy-mm-dd hh:mm:ss"
  );
};
