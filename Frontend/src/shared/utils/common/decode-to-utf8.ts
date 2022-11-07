import { Buffer } from "buffer";

export const decodeToUtf8 = (data: string) => {
  return Buffer.from(data, "base64").toString("utf-8");
};
