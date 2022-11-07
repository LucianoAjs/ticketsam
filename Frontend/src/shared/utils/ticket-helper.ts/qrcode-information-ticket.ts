import { MutableRefObject } from "react";
import { ITicket } from "shared/interfaces/ticket.interface";

export const qrcodeInformationTicket = (
  ticket: ITicket,
  paymentStatus: string,
  qrcodeRef?: MutableRefObject<HTMLDivElement> | unknown
) => {
  const { boat_name, home_city, destination_city, dt_output, dt_arrival } =
    ticket;

  const elements = [
    `<body> <div> <h1>Informações do bilhete </h1>`,
    `<h3>O Status do pagamento é: ${paymentStatus}</h3>`,
    `<h3>Nome do barco: ${boat_name}</h3>`,
    `<h3>Origem: ${home_city}</h3>`,
    `<h3>Destino: ${destination_city}</h3>`,
    `<h3>Data de partir: ${new Date(dt_output).toLocaleString()} </h3>`,
    `<h3>Data de chegada: ${new Date(dt_arrival).toLocaleString()}</h3> </br>`,
    `<h2>Leia o qrcode abaixo para validar o ticket.</h2>`,
    qrcodeRef,
    "</div></body></html>",
  ];

  if (!qrcodeRef) {
    return elements.filter((_v, i) => i !== 7 && i !== 8);
  } else {
    return elements;
  }
};
