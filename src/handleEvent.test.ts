import { jest } from "@jest/globals";
import axios from "axios";
import { Low, Memory } from "lowdb";
import { createLogger } from "./createLogger.js";
import { handleEvent } from "./handleEvent.js";
import { BPOptions, Data } from "./types.js";
import { getNotifications } from "./unifier/api/eventNotifications/getNotifications.js";
import { EventData, EventFilter } from "./unifier/api/eventNotifications/types.js";
jest.mock("axios");

const unifier = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.UNIFIER_USER_TOKEN}`
  }
});

test("one event", async () => {
  const project_number = process.env.TEST_PROJ_ID;
  const bp = {
    options: {
      project_number,
      bpname: "Performance Snapshot",
      workflow_details: {
        workflow_name: "WF_1",
        user_name: "Company Administrator",
        action_name: "Submit"
      }
    },
    data: [{ Rep_Pd_DP: process.env.TEST_RP }]
  };

  const logger = createLogger("error");
  const db = new Low(new Memory<Data>(), { latest_event_date: new Date(), events: [] });
  await db.read();
  db.data ||= { latest_event_date: new Date(), events: [] };
  const createBP = await unifier.post("/ws/rest/service/v2/bp/record", bp);


  const filter: EventFilter = {
    object_name: "Performance Snapshot",
    new_status: "Submitted",
    record_no: createBP.data.message[0].record_no
  };
  //return events from unifier using the above filter
  const eventData: EventData = await getNotifications(unifier, filter);
  const bpOptions: BPOptions = {
    LineItemIdentifier: "uuu_P6WBSPath",
    WFActionName: "Create Snapshot" // Name of action to run
  };
  //extract the list of events and the latest event date
  const { items, latest_event_date } = eventData;

  const handledEvent = await handleEvent(logger, db, unifier, items[0], "wbs_perf", bpOptions);

  expect(handledEvent?.data.message[0]._record_status).toEqual("success");
});

test("event where record has already been accepted", async () => {
  const logger = createLogger("error");
  const db = new Low(new Memory<Data>(), { latest_event_date: new Date(), events: [] });
  await db.read();
  db.data ||= { latest_event_date: new Date(), events: [] };

  const eventData = {
    workflow_from: "Creation",
    old_status: null,
    workflow_action: "Submit",
    workflow_to: "Submitted",
    object_type: "Business Process",
    new_status: "Submitted",
    shell_number: process.env.TEST_PROJ_ID as string,
    object_prefix: "uxl10046",
    project_id: 1038,
    object_name: "Performance Snapshot",
    record_no: process.env.TEST_ACCEPTED_BP as string,
    event_date: "2022-06-14T13:50:37.042",
    object_subtype: "WorkFlow"
  };

  const bpOptions: BPOptions = {
    LineItemIdentifier: "uuu_P6WBSPath",
    WFActionName: "Create Snapshot" // Name of action to run
  };

  const handledEvent = await handleEvent(logger, db, unifier, eventData, "wbs_perf", bpOptions);
  expect(handledEvent).toMatchObject({
    data: {
      data: [],
      message: [
        {
          ugenDescriptionMTL4000: "Record has already been accepted by Task Assignee. ",
          _record_status: "Record has already been accepted by Task Assignee. ",
          record_no: process.env.TEST_ACCEPTED_BP
        }
      ],
      status: 3000
    },
    status: 200
  });
});
