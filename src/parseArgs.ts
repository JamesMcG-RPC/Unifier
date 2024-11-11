import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { Args } from "./types.js";

/**
 * function for parsing command line arguments and making sure either a settings path, or the other arguments are provided if a settings file isn't used.
 * @param argv - NodeJS Process argv object - contains Command Line arguments passed to the application
 * @param exitProcess - yargs option for whether the process should exit on an error, such as when required arguments are not provided.
 */

export async function parseArgs(argv: string[], exitProcess: boolean = true): Promise<Args> {
  try {
    
    return await yargs(argv.slice(2))
      .exitProcess(exitProcess)
      .options({
        settings: { type: "string", describe: "path of settings file to use", alias: "s" },
        token: { type: "string", describe: "integration user bearer token", alias: "t" },
        frequency: {
          type: "number",
          describe: "interval in ms to check for new events",
          alias: "f"
        },
        url: { type: "string", describe: "base URL of unifier instance (without /unifier)", alias: "u" },
        dbFile: { type: "string", describe: "path of json file to use", alias: "d" },
        loggingLevel: {
          type: "string",
          describe: "level of errors to log",
          choices: ["error", "info", "debug"],
          alias: "l"
        }
      })
      .check((args) => {
        const argsToCheck = ["token", "frequency", "url", "dbFile", "loggingLevel"];
        if (!args.settings && !argsToCheck.every((arg) => arg in args)) {
          throw new Error("you must supply either --settings or all of the other arguments.");
        } else {
          return true;
        }
      })
      .parse();
  } catch (error) {
    throw error
  }
}
