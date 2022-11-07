import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { NextButton } from "shared/components/buttons";
import Spin from "shared/components/Spin";
import { ENDPOINT } from "shared/constants/endpoints";
import { paymentReponseParams } from "shared/constants/payment-response-params.constant";
import { URL_PAYMENT_STATUS } from "shared/constants/url-payment-status";
import { IPaymentResponseParams } from "shared/interfaces/payment-response-params.interface";
import { ITicket } from "shared/interfaces/ticket.interface";
import { decodeToUtf8 } from "shared/utils/common/decode-to-utf8";
import { currentStatusPayment } from "shared/utils/common/status";
import { printTicket } from "shared/utils/ticket-helper.ts/print-ticket";

import Container from "./styles";

export const Feedback = () => {
  const qrcodeRef = useRef(null);
  const [searchParams] = useSearchParams();

  const [ticket, setTicket] = useState<ITicket>();
  const [fetching, setFetching] = useState(false);
  const [dataPayment, setDataPayment] = useState<IPaymentResponseParams>();
  const [src, setSrc] = useState<string>();
  const navigate = useNavigate();

  const printScreenByElement = () => {
    const paymentStatusResult = paymentStatus();
    if (ticket && paymentStatusResult && qrcodeRef) {
      printTicket(ticket, paymentStatusResult, qrcodeRef);
    }
  };

  const paymentStatus = (): any => {
    if (ticket) {
      const { payment, id } = ticket;
      const dataPayment = payment?.find((item) => item.ticketId === id);
      if (dataPayment?.status) {
        return currentStatusPayment(dataPayment?.status);
      }
    }
  };

  const sendPaymentStatus = useCallback(async () => {
    setFetching(true);
    const getParams = paymentReponseParams.map((param) => {
      return { [param]: searchParams.get(param) };
    });

    const paramsConcat = getParams.reduce((acumulador, valorAtual) => {
      return { ...acumulador, ...valorAtual };
    }, {});

    const paymentData = JSON.parse(JSON.stringify(paramsConcat));
    setDataPayment(paymentData);

    await ENDPOINT.SEND_PAYMENT_STATUS(paymentData).catch(() => {});

    const { data } = await ENDPOINT.GET_TICKET_BY_ID(
      paymentData.external_reference
    );

    setTicket(data);

    const url = URL_PAYMENT_STATUS(
      paymentData.payment_id,
      paymentData.external_reference
    );

    const res = await ENDPOINT.GENERATE_QRCODE(url);

    const qrcode = decodeToUtf8(res.data.qrcode);

    setSrc(qrcode);

    setFetching(false);
  }, [searchParams]);

  useEffect(() => {
    sendPaymentStatus();
  }, [sendPaymentStatus]);

  if (fetching) {
    return <Spin />;
  }

  return (
    <Container>
      <h2>{"O Status do pagamento é: " + dataPayment?.status || "negado"} </h2>
      {!src && (
        <h3>Algo deu errado no seu pagamento, por favor contate o suporte. </h3>
      )}
      {src && (
        <>
          <h3>Apresente o QRcode abaixo na hora de embarcar. </h3>
          <img
            ref={qrcodeRef}
            width={200}
            src={src}
            alt="QRCODE"
            key="qrcode"
          />
        </>
      )}
      <NextButton
        handleClick={printScreenByElement}
        icon={false}
        text="Imprimir QRcode"
      />
    </Container>
  );
};
