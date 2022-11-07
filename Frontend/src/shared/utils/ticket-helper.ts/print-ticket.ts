import { MutableRefObject } from "react";
import { ITicket } from "shared/interfaces/ticket.interface";
import { qrcodeInformationTicket } from "./qrcode-information-ticket";

export const printTicket = (
  ticket: ITicket,
  paymentStatus: string,
  qrcodeRef?: MutableRefObject<HTMLDivElement> | any
) => {
  const win = window;
  const ref =
    qrcodeRef?.current &&
    (qrcodeRef as unknown as MutableRefObject<HTMLDivElement>).current
      .outerHTML;

  if (win && qrcodeRef?.current && ticket) {
    qrcodeInformationTicket(ticket, paymentStatus, ref).forEach((tag: any) =>
      win.document.write(tag)
    );
    window.document.close();
    win.print();
  }
};
