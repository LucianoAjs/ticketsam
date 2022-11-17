import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { useCallback, useState } from "react";
import { BiError } from "react-icons/bi";
import { GiConfirmed } from "react-icons/gi";
import { QRcodeScanner } from "shared/components/QRcodeScanner";
import { ENDPOINT } from "shared/constants/endpoints";
import Container, { ScannerStyles } from "./styles";

export const ValidateTicket = ({ setOpen }: { setOpen: Function }) => {
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
    <Container className={classStatus}>
      {!classStatus && (
        <>
          <h2>Escaneie o qrcode para validar o bilhete.</h2>
          <ScannerStyles>
            <QRcodeScanner setData={validateQRcode} />
          </ScannerStyles>{" "}
        </>
      )}

      {classStatus === "success" && (
        <>
          <GiConfirmed fontSize={100} className={classStatus} />
          <h3>O bilhete é valido.</h3>
        </>
      )}
      {classStatus === "error" && (
        <>
          <BiError fontSize={100} className={classStatus} />{" "}
          <h3>O bilhete não é valido.</h3>
        </>
      )}

      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={() => setOpen(false)}
      >
        Voltar
      </Button>
    </Container>
  );
};
