import axios from "axios";
import { jest } from "@jest/globals";
import { Low, Memory } from "lowdb";
import { callFn } from "./callFn.js";
import { createLogger } from "../src/createLogger.js";
test("test when getNotifications errors, but the call returns successfully", async () => {
    const logger = createLogger("error");
    const db = new Low(new Memory(), { latest_event_date: new Date(), events: [] });
    await db.read();
    db.data ||= { latest_event_date: new Date(), events: [] };
    const consoleSpy = jest.spyOn(logger, "error");
    const unifier = axios.create({
        baseURL: process.env.BASE_URL,
        headers: {
            Authorization: `Bearer ${process.env.UNIFIER_USER_TOKEN}`
        }
    });
    const project_number = process.env.TEST_PROJ_ID;
    const bp = {
        options: {
            project_number,
            bpname: "Performance Snapshot",
            workflow_details: {
                workflow_name: "WF",
                user_name: "Company Administrator",
                action_name: "Submit"
            }
        },
        data: [{ Rep_Pd_DP: process.env.TEST_RP }]
    };
    const filter = {
        object_name: "Performance Snapshot",
        new_status: "Submitted",
        event_date: new Date("960-06-12T12:34")
    };
    const fn = await callFn(logger, db, unifier, filter);
    //check that the BP has been
    expect(fn).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith('{"message":"filter parameter is invalid","status":1340,"name":"getNotifications"}');
});
//# sourceMappingURL=callFn.test.js.map