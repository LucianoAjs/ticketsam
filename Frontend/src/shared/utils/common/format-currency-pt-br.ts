export function formatCurrencyPtBr(value: string | number | undefined) {
  if (!value) return `R$ 0,0`;
  return value.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}
