import { AxiosInstance } from "axios";
import { Low } from "lowdb/lib";
import * as R from "ramda";
import { Logger } from "winston";
import { handleUpdateBPError } from "./handleUpdateBPError.js";
import { BPOptions, Data } from "./types.js";
import { BP } from "./unifier/api/BP/types.js";
import { EventNotification } from "./unifier/api/eventNotifications/types.js";
import { getUDR } from "./unifier/api/udr/getUDR.js";
import { UnifierBPResponse } from "./unifier/lib/types";
import { getPerformanceSnapshot } from "./snapshot/performance/getPerformanceSnapshot.js";

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
export async function handleEvent(
  logger: Logger,
  db: Low<Data>,
  unifier: AxiosInstance,
  event: EventNotification,
  udrName: string,
  bpOptions: BPOptions
) {

    logger.info({ message: `event started` });
    logger.debug({ message: JSON.stringify(event) });
    const { object_name, shell_number, record_no, workflow_to } = event;
    const { LineItemIdentifier, WFActionName } = bpOptions;
    logger.info(`shell_number: ${shell_number}, record_no: ${record_no}`);
    const udr = await getUDR(unifier, udrName, shell_number);
    logger.debug(JSON.stringify(udr));
    //create BP object using the event and udr
    const bp: BP = {
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
          ugenDescriptionMTL4000: "",
          _bp_lineitems: await getSnapshotLineItems(logger, unifier, object_name, shell_number),
          record_no
        }
      ]
    };
    logger.debug(JSON.stringify(bp));
    //attempt to update the BP
    let update: UnifierBPResponse = await unifier.put(`/ws/rest/service/v2/bp/record`, bp);
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
      db.data!.events = R.reject(
        (e: EventNotification) => e.shell_number == shell_number && e.record_no == record_no,
        db.data!.events
      );
      await db.write();
    }
    logger.info(`event finished`);
    return update;
  
}

async function getSnapshotLineItems(logger, unifier: AxiosInstance, bp_name: string, shell_number: string): Promise<{[key: string]: string}[]> {
  switch (bp_name) {
    case "Performance Snapshot":
      return getPerformanceSnapshot(unifier, shell_number);
    case "Period to Period Snapshot":
      return []
    
    case "CT Snapshot":
      return []
    
    default:
      logger.error(`unsupported BP name: ${bp_name}`);
      return []
  
  }

}