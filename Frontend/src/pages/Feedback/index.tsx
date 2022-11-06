import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Spin from "shared/components/Spin";
import { ENDPOINT } from "shared/constants/endpoints";
import { paymentReponseParams } from "shared/constants/payment-response-params.constant";
import { IPaymentResponseParams } from "shared/interfaces/payment-response-params.interface";

export const Feedback = () => {
  const [searchParams] = useSearchParams();

  const [fetching, setFetching] = useState(false);
  const [dataPayment, setDataPayment] = useState<IPaymentResponseParams>();

  const sendPaymentStatus = useCallback(async () => {
    setFetching(true);
    const getParams = paymentReponseParams.map((param) => {
      return { [param]: searchParams.get(param) };
    });

    const paramsConcat = getParams.reduce(function (acumulador, valorAtual) {
      return { ...acumulador, ...valorAtual };
    }, {});

    const paymentData = JSON.parse(JSON.stringify(paramsConcat));
    setDataPayment(paymentData);
    await ENDPOINT.SEND_PAYMENT_STATUS(paymentData);

    setFetching(false);
  }, [searchParams]);

  useEffect(() => {
    sendPaymentStatus();
  }, [sendPaymentStatus]);

  if (fetching) {
    return <Spin />;
  }

  return <div>{"Status do pagamento: " + dataPayment?.status}</div>;
};
