import { EventNotification } from "./unifier/api/eventNotifications/types.js";

export type Data = {
    latest_event_date: Date;
    events: EventNotification[];
  };
  
  

export type LoggingLevel = "info" | "error" | "debug"

export type Args = {
    [x: string]: unknown;
    settings: string | undefined;
    token: string | undefined;
    frequency: number | undefined;
    url: string | undefined;
    dbFile: string | undefined;
    loggingLevel: string | undefined;
    _: (string | number)[];
    $0: string;
  }

  export interface BPOptions {
    LineItemIdentifier: string;
    WFActionName: string;

  }