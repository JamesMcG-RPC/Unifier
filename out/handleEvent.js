import * as R from "ramda";
import { handleUpdateBPError } from "./handleUpdateBPError.js";
import { getUDR } from "./unifier/api/udr/getUDR.js";
/**
 * function that is run against events returned via {@link getNotifications}
 * @param logger - winston logger instance
 * @param db - lowdb database instance
 * @param unifier - Axios Instance pointing to Unifier REST API
 * @param event - event notification returned from Unifier REST API
 * @param udrName - Name of UDR in unifier to get
 * @param bpOptions - object containing properties to add to the bp object
 *
 */
export async function handleEvent(logger, db, unifier, event, udrName, bpOptions) {
    logger.info({ message: `event started` });
    logger.debug({ message: JSON.stringify(event) });
    const { object_name, shell_number, record_no, workflow_to } = event;
    const { LineItemIdentifier, WFActionName } = bpOptions;
    logger.info(`shell_number: ${shell_number}, record_no: ${record_no}`);
    const udr = await getUDR(unifier, udrName, shell_number);
    logger.debug(JSON.stringify(udr));
    //create BP object using the event and udr
    const bp = {
        options: {
            project_number: shell_number,
            bpname: object_name,
            LineItemIdentifier,
            workflow_details: {
                WFCurrentStepName: workflow_to,
                WFActionName
            }
        },
        data: [
            {
                _bp_lineitems: udr,
                record_no
            }
        ]
    };
    logger.debug(JSON.stringify(bp));
    //attempt to update the BP
    let update = await unifier.put(`/ws/rest/service/v2/bp/record`, bp);
    //if the REST request is successful
    if (update.status == 200) {
        //if the unifier request itself is not successful
        if (update.data.status !== 200) {
            logger.debug(JSON.stringify(update.data));
            logger.error(JSON.stringify(update.data.message));
            //attempt to update the BP with the error message
            update = await handleUpdateBPError(logger, unifier, event, update);
        }
        //remove all matching events from the db object
        db.data.events = R.reject((e) => e.shell_number == shell_number && e.record_no == record_no, db.data.events);
        await db.write();
    }
    logger.info(`event finished`);
    return update;
}
//# sourceMappingURL=handleEvent.js.map