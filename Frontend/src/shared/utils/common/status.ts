import {
  PaymentStatus,
  PaymentStatusPtBR,
} from "shared/enums/payment-status.enum";

export const currentStatusPayment = (status: string) => {
  switch (status) {
    case PaymentStatus.APPROVED:
      return PaymentStatusPtBR.APROVADO;
    case PaymentStatus.PENDING:
      return PaymentStatusPtBR.PENDENTE;
    case PaymentStatus.REFUSED:
      return PaymentStatusPtBR.RECUSADO;
    default:
      return PaymentStatusPtBR.RECUSADO;
  }
};
