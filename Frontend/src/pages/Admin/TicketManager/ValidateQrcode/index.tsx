import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { useCallback, useState } from "react";
import { QRcodeScanner } from "shared/components/QRcodeScanner";
import { ENDPOINT } from "shared/constants/endpoints";
import Container from "./styles";

export const ValidateQrcode = ({ setOpen }: { setOpen: Function }) => {
  const [classStatus, setClassStatus] = useState<any>();

  const validateQRcode = useCallback(async (qrcodeData: any) => {
    const urlString = qrcodeData || "";
    const url = new URL(urlString);

    const paymentId = url.searchParams.get("paymentId") || "";
    const ticketId = url.searchParams.get("ticketId") || "";

    try {
      await ENDPOINT.VALIDATE_TICKET(ticketId, paymentId);
      setClassStatus("success");
    } catch (error) {
      setClassStatus("error");
    }
  }, []);

  return (
    <Container className={`${classStatus}`}>
      <h2>Escaneie o qrcode para confirmar.</h2>

      <QRcodeScanner setData={validateQRcode} />

      {classStatus === "success" && <h3>O QRcode é valido.</h3>}
      {classStatus === "error" && <h3>O QRcode não é valido.</h3>}

      <div>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => setOpen(false)}
        >
          Voltar
        </Button>
      </div>
    </Container>
  );
};
