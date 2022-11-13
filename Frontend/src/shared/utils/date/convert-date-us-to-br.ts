export const convertDateFormatUsToBr = (dateUS: string) => {
  const date = dateUS.split("T")[0];
  const splitDate = date.split("-");

  const year = splitDate[0];
  const moth = splitDate[1];
  const day = splitDate[2];

  return `${day}/${moth}/${year}`;
};
