import { UnifierError } from "../../lib/UnifierError.js";
import { udrParser } from "./udrParser.js";
/**
 *
 * @param unifier - Axios Instance pointing to Unifier REST API
 * @param reportname - name of report to get from unifier
 * @param project_id - Shell number of project to run the report on. If not included, the report will instead be ran from company level.
 * @returns
 */
export async function getUDR(unifier, reportname, project_id = "") {
    //Get the specified UDR
    const response = await unifier.post(`/ws/rest/service/v1/data/udr/get/${project_id}`, {
        reportname
    });
    //extract the udr from the response
    const udr = response?.["data"]?.["data"]?.[0];
    //if the UDR has been returned successfully, return it, else throw an error
    if (udr !== undefined) {
        return udrParser(udr);
    }
    else {
        throw new UnifierError("getUDR", response);
    }
}
//# sourceMappingURL=getUDR.js.map