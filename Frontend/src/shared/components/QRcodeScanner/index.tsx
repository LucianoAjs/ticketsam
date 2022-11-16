import { useState } from "react";
import QrReader from "react-qr-reader";

interface IProps {
  setData: Function;
}

export const QRcodeScanner = ({ setData }: IProps) => {
  const [count, setCount] = useState(0);

  const handleError = (e: any) => {
    console.error(e);
  };

  const handleScan = (data: any) => {
    if (data && count === 0) {
      setData(data);

      setCount(1);
    }
  };

  return (
    <QrReader
      delay={300}
      onError={handleError}
      onScan={handleScan}
      style={{ height: 240, width: 320, marginBottom: "4rem" }}
      facingMode="environment"
    />
  );
};
