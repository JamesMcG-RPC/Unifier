import * as winston from "winston";
import { LoggingLevel } from "./types.js";

//function for formatting winston log messages. If an Auth token is in the message, it is replaced with asterisks.
export const formatLog = ({
  level,
  message,
  label,
  timestamp
}: winston.Logform.TransformableInfo) =>
  `[${level}] ${timestamp}${label != undefined ? " - " + label : ""} - ${typeof message == "string" ? message.replace(
    /(Bearer .*?)"/,
    '*****"'
  ) : message}`;

/**
 *
 * @param loggingLevel - the node logging level to log the message at
 *
 */
export function createLogger(loggingLevel: LoggingLevel) {
  //log message format. as part of the format, replace auth tokens with asterisks
  const logFormat = winston.format.printf(formatLog);
  //create console transport if set in the settings file
  const transports = [
    new winston.transports.Console({
      level: loggingLevel,
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
        logFormat
      ),
      handleExceptions: true,
      stderrLevels: ["error"]
    })
  ];
  //create winston logger to send log messages to. This is imported into other modules.
  return winston.createLogger({
    transports
  });
}
