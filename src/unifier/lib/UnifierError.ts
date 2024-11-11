import { UnifierResponse } from "./types.js";

export class UnifierError extends Error {
  status: number;
  message: string;

  constructor(name: string, response: UnifierResponse) {
    const message = response?.["data"]?.["message"]?.[0] || "Unknown Error has occurred";

    super(JSON.stringify(message));
    this.name = name;
    this.status = response["data"]["status"];
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}
