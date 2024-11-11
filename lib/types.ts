import { AxiosResponse } from "axios";

export interface UnifierBPResponseMessage {
  _bp_lineitems: {[key: string]: string | number | null}[];
  _record_status: string;
  record_no: string;
}

export interface UnifierBPResponse extends AxiosResponse {
  data: { data: any[]; message: UnifierBPResponseMessage[]; status: number };
}


export interface UnifierResponse extends AxiosResponse {
  data: { data: any[]; message: string[]; status: number };
}
