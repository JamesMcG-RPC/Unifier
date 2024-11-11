import { hasAllKeys } from "./hasAllKeys";
import { getUDR } from "../unifier/api/udr/getUDR";
export async function getSnapshot(unifier, reportName, keys) {
    const udr = await getUDR(unifier, reportName);
    if (udr.every((row) => hasAllKeys(row, keys))) {
        return udr;
    }
    else {
        throw new Error("returned UDR does not contain specified keys");
    }
}
//# sourceMappingURL=getSnapshot.js.map