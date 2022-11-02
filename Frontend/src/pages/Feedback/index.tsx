import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Spin from "shared/components/Spin";
import { ENDPOINT } from "shared/constants/endpoints";
import { paymentReponseParams } from "shared/constants/payment-response-params.constant";

export const Feedback = () => {
  const [searchParams] = useSearchParams();

  const [fetching, setFetching] = useState(false);

  const sendPaymentStatus = useCallback(async () => {
    setFetching(true);
    const getParams = paymentReponseParams.map((param) => {
      return { [param]: searchParams.get(param) };
    });

    const paramsConcat = getParams.reduce(function (acumulador, valorAtual) {
      return { ...acumulador, ...valorAtual };
    }, {});

    const paymentData = JSON.parse(JSON.stringify(paramsConcat));

    await ENDPOINT.SEND_PAYMENT_STATUS(paymentData);

    setFetching(false);
  }, [searchParams]);

  useEffect(() => {
    sendPaymentStatus();
  }, [sendPaymentStatus]);

  if (fetching) {
    return <Spin />;
  }

  return <div>Payment</div>;
};
