import { AxiosInstance } from "axios";
import { hasAllKeys } from "./hasAllKeys.js";
import { getUDR } from "../unifier/api/udr/getUDR.js";
import { Query } from "../unifier/api/udr/types.js";

export async function getSnapshot(unifier: AxiosInstance, reportName, keys: string[], shell_number?: string, query?: Query[]) {
  const udr = await getUDR(unifier, reportName, shell_number, query);
  if (udr.every((row) => hasAllKeys(row, keys))) {
    return udr;
  } else {
    throw new Error("returned UDR does not contain specified keys");
  }
}
