import { handleEvent } from "./handleEvent.js";
import { getNotifications } from "./unifier/api/eventNotifications/getNotifications.js";
/**
 * The function that is called on a given interval to check for event notifications
 * and then handle those events.
 * @param logger - winston logger instance
 * @param db - lowdb adapter containing a list of events and the latest event date
 * @param unifier - axios instance for the given unifier environment
 * @param filter - filter to send as part of the GET request to the EventNotifications endpoint.
 * It will return any Events for submitted performance snapshots after
 * the last returned latest event date. (i.e. any events since last time it was run)
 */
export async function callFn(logger, db, unifier, filter) {
    logger.info({ label: "callFn", message: "started" });
    try {
        //return events from unifier using the above filter
        const eventData = await getNotifications(unifier, filter);
        //extract the list of events and the latest event date
        const { items, latest_event_date } = eventData;
        logger.debug({ label: "events", message: JSON.stringify(items) });
        //if any new events are returned, write them to the db
        if (items.length > 0) {
            //add all returned events to db
            db.data.events = db.data.events.concat(items);
            //update last run date in the db
            db.data.latest_event_date = latest_event_date;
            //write the db to file
            await db.write();
        }
        const bpOptions = {
            LineItemIdentifier: "uuu_P6WBSPath",
            WFActionName: "Create Snapshot" // Name of action to run
        };
        //apply the handleEvent function to each event
        return Promise.allSettled(db.data.events.map((event) => handleEvent(logger, db, unifier, event, "wbs_perf", bpOptions)));
    }
    catch (error) {
        logger.error(JSON.stringify(error));
        return [];
    }
}
//# sourceMappingURL=callFn.js.map