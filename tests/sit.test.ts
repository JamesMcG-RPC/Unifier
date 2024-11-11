import axios from "axios";
import { Low, Memory } from "lowdb";
import { callFn } from "../src/callFn.js";
import { createLogger } from "../src/createLogger.js";
import { Data } from "../src/types.js";
import { EventFilter } from "../src/unifier/api/eventNotifications/types.js";

test("test that a created BP is successfully picked up and completed", async () => {
  const logger = createLogger("error");
  const db = new Low(new Memory<Data>(), { latest_event_date: new Date(), events: [] });
  await db.read();
  db.data ||= { latest_event_date: new Date(), events: [] };

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
  const createBP = await unifier.post("/ws/rest/service/v2/bp/record", bp);

  const { record_no } = createBP["data"]["message"][0];

  const filter: EventFilter = {
    object_name: "Performance Snapshot",
    new_status: "Submitted",
    record_no: createBP.data.message[0].record_no
  };

  await callFn(logger, db, unifier, filter);

  const readBP = await unifier.get(`/ws/rest/service/v1/bp/record/${project_number}`, {
    params: { input: { record_no, bpname: "Performance Snapshot" } }
  });

  //check that the BP has been
  expect(readBP.data.data[0]["status"]).toEqual("Posted");
});
