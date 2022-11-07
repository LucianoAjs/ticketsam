import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ENDPOINT } from "shared/constants/endpoints";
import { HOME } from "shared/constants/routes";
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

  const navigate = useNavigate();
  const getPaymentStatus = useCallback(async () => {
    await ENDPOINT.GET_PAYMENT_STATUS(paymentId || "")
      .then((v) => setPaymentStatus(v.data.payment))
      .catch(() => navigate(HOME));
  }, [navigate, paymentId]);

  const getTicket = useCallback(async () => {
    await ENDPOINT.GET_TICKET_BY_ID(ticketId || "")
      .then((v) => setTicket(v.data))
      .catch(() => navigate(HOME));
  }, [navigate, ticketId]);

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
