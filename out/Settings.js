import { readFileSync } from "fs";
import yaml from "yaml";
// import { AppError } from "./AppError.js";
const { parse, stringify } = yaml;
/**
 *
 * @param path file directory of the settings.yaml file
 * @returns a JSON object version of the file
 */
export function getSettings(path) {
    try {
        let settings = parse(readFileSync(path, "utf-8"));
        return settings;
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=Settings.js.map