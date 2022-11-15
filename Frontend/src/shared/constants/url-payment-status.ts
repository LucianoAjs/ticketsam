export const URL_PAYMENT_STATUS = (paymentId: string, ticketId: string) => {
  return `http://localhost:3000/payment/status?paymentId=${paymentId}&ticketId=${ticketId}`;
};
