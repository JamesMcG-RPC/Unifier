import { AxiosInstance } from "axios";
import { UnifierError } from "../../lib/UnifierError.js";
import { UDR, udrParser } from "./udrParser.js";
import { Query, UdrRequest } from "./types.js";

/**
 * 
 * @param unifier - Axios Instance pointing to Unifier REST API
 * @param reportname - name of report to get from unifier
 * @param shell_number - Shell number of project to run the report on. If not included, the report will instead be ran from company level.
 * @returns 
 */
export async function getUDR(
  unifier: AxiosInstance,
  reportname: string,
  shell_number: string = "",
  query?: Query[]
): Promise<{[key: string]: string}[]> {
  //Get the specified UDR
  const request: UdrRequest = {
    reportname,
    query
  }
  const response = await unifier.post(`/ws/rest/service/v1/data/udr/get/${shell_number}`, request);
  //extract the udr from the response
  const udr: UDR = response?.["data"]?.["data"]?.[0];
  
  //if the UDR has been returned successfully, return it, else throw an error
  if (udr !== undefined) {
    return udrParser(udr);
  } else {
    throw new UnifierError("getUDR", response);
  }
}
