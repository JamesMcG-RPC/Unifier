import axios from "axios";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { callFn } from "./callFn.js";
import { createLogger } from "./createLogger.js";
import { parseArgs } from "./parseArgs.js";
import { getSettings } from "./Settings.js";
async function main() {
    //parse CLI arguments
    const args = await parseArgs(process.argv);
    //load and parse the settings file. File path either provided from CLI or picked up from cwd
    const settingsPath = args["settings"];
    //if settingsPath is given, attempt to read the file at the provided path. If not given, initialise as empty object.
    const settings = settingsPath ? await getSettings(settingsPath) : {};
    //set up variables from args and settings file.
    const baseURL = args["url"] || settings["unifier"]["url"];
    const userToken = args["token"] || settings["unifier"]["token"];
    const dbFile = args["dbFile"] || settings["settings"]["dbFile"] || `${process.cwd()}/unifier-db.json`;
    const frequency = args["frequency"] || settings["settings"]["frequency"];
    const loggingLevel = args["loggingLevel"] || settings["settings"]["loggingLevel"];
    //create winston logger at logging level defined either from the settings file or CLI
    const logger = createLogger(loggingLevel);
    logger.info({ label: "main", message: "started" });
    //open json file for use with lowdb. the file path is either pulled from the settings file or from cwd.
    const adapter = new JSONFile(dbFile);
    const db = new Low(adapter, { latest_event_date: new Date(), events: [] });
    //read the db file
    await db.read();
    //initialise data if the db data is falsy (e.g. null/undefined)
    db.data ||= { latest_event_date: new Date(), events: [] };
    //create Axios instance for the unifier url found in the settings file
    try {
        const unifier = axios.create({
            baseURL,
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });
        //function for checking for and then handling events after a given interval. Will wait until each loop is completed before continuing.
        const loop = (interval) => {
            /*filter to send as part of the GET request to the EventNotifications endpoint.
             *It will return any Events for submitted performance snapshots after the last returned latest event date
             *(i.e. any events since last time it was run)
             */
            const filter = {
                event_date: db.data.latest_event_date,
                object_name: "Performance Snapshot",
                new_status: "Submitted"
            };
            setTimeout(() => {
                callFn(logger, db, unifier, filter).then(() => {
                    logger.info({ label: "callFn", message: "finished" });
                    loop(interval);
                });
            }, interval);
        };
        loop(frequency);
    }
    catch (error) {
        logger.error(JSON.stringify(error));
    }
}
main();
//# sourceMappingURL=index.js.map