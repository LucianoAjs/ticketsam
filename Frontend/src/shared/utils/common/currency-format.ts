import { CURRENCY_FORMATTER } from "shared/constants/common";

export function currencyFormat(value: any) {
  if (!Number(value)) return "";

  const amount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value / CURRENCY_FORMATTER);

  return `${amount}`;
}
