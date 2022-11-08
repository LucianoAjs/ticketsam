import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ENDPOINT } from "shared/constants/endpoints";
import { IPayment } from "shared/interfaces/payment.interface";
import { ITicket } from "shared/interfaces/ticket.interface";
import { currentStatusPayment } from "shared/utils/common/status";
import { qrcodeInformationTicket } from "shared/utils/ticket-helper.ts/qrcode-information-ticket";
import Container, { CardStyles } from "./styles";

export const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("paymentId");
  const ticketId = searchParams.get("ticketId");

  const [ticket, setTicket] = useState<ITicket>();
  const [paymentStatus, setPaymentStatus] = useState<IPayment>();

  const getPaymentStatus = useCallback(async () => {
    const {
      data: { payment },
    } = await ENDPOINT.GET_PAYMENT_STATUS(paymentId || "");
    setPaymentStatus(payment);
  }, [paymentId]);

  const getTicket = useCallback(async () => {
    const { data } = await ENDPOINT.GET_TICKET_BY_ID(ticketId || "");
    setTicket(data);
  }, [ticketId]);

  useEffect(() => {
    getPaymentStatus();
    getTicket();
  }, [getPaymentStatus, getTicket]);

  const ticketInformation =
    ticket &&
    paymentStatus &&
    qrcodeInformationTicket(ticket, currentStatusPayment(paymentStatus.status));

  return (
    <Container>
      <CardStyles>
        {ticketInformation?.map((v) => (
          <div dangerouslySetInnerHTML={{ __html: v as string }} />
        ))}
      </CardStyles>
    </Container>
  );
};
