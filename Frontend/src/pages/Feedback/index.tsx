import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ENDPOINT } from "shared/constants/endpoints";
import { paymentReponseParams } from "shared/constants/payment-response-params.constant";

export const Feedback = () => {
  const [searchParams] = useSearchParams();

  const sendPaymentStatus = useCallback(async () => {
    const getParams = paymentReponseParams.map((param) => {
      return { [param]: searchParams.get(param) };
    });

    const paramsConcat = getParams.reduce(function (acumulador, valorAtual) {
      return { ...acumulador, ...valorAtual };
    }, {});

    const paymentData = JSON.parse(JSON.stringify(paramsConcat));

    await ENDPOINT.SEND_PAYMENT_STATUS(paymentData);
  }, [searchParams]);

  useEffect(() => {
    sendPaymentStatus();
  }, [sendPaymentStatus]);

  return <div>Payment</div>;
};
