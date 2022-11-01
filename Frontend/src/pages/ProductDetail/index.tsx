import { useCallback, useEffect, useState } from "react";
import { ENDPOINT } from "shared/constants/endpoints";
import { IProduct } from "shared/interfaces/product.interface";

export const ProductDetail = ({
  ticketId,
  product,
}: {
  ticketId: string;
  product: IProduct;
}) => {
  // TODO: implement call for product detail after choose de product in product list
  const [mercadoPagoUrl, setMercadoPagoUrl] = useState<string>();

  const createPreference = useCallback(async () => {
    const {
      data: { sandbox_init_point },
    } = await ENDPOINT.CREATE_PREFERENCE(ticketId, product);

    setMercadoPagoUrl(sandbox_init_point);
  }, [product, ticketId]);

  useEffect(() => {
    createPreference();
  }, [createPreference]);

  const handleclick = () => {
    window.close();
  };

  return (
    <a href={mercadoPagoUrl} onClick={handleclick}>
      Pay
    </a>
  );
};
