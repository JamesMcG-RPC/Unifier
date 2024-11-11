import { LoggingLevel } from './types.js';
import { readFileSync, writeFileSync } from "fs";
import yaml from "yaml";
// import { AppError } from "./AppError.js";

const {parse, stringify} = yaml


export interface Settings {
  unifier: {
    url: string; //unifier base url.
    token: string; //user token for unifier service account
  };

  settings: {
    frequency: number; //interval to check for new events in ms
    dbFile: string;
    loggingLevel: LoggingLevel
  };
}

/**
 *
 * @param path file directory of the settings.yaml file
 * @returns a JSON object version of the file
 */
export function getSettings(path: string): Settings {
  try {
    let settings = parse(readFileSync(path, "utf-8"));

    return settings;
  } catch (error) {
    throw error
  }
}

