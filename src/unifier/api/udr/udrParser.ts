import * as R from "ramda";

export interface UDR {
  report_header: {
    [c_: string]: {
      name: string;
      type: string;
    };
  };
  report_row: {
    [c_: string]: string;
  }[];
}

/**
 *
 * @param udr - Unifier UDR returned from the Unifier REST API, which contains arrays of headers and rows
 * @returns JS object that replaces the header reference in the rows with the actual header name
 *
 * @example
 * ```
 * {
 * "report_header": {
 *     "c1": {"name": "Name", "type": "java.lang.String"},
 *     "c2": {"name": "Cost", "type": "java.lang.Double"}
 *   },
 * "report_row": [
 *     {"c1": "Apple", "c2": "1,000.00"},
 *     {"c1": "Orange", "c2": "750.00"}
 *   ]
 * }
 * ``` 
 * becomes
 * ```
 * [
 *   {"Name": "Apple", "Cost": 1000.00},
 *   {"Name": "Orange", "Cost": 750.00}
 * ]
 * ```
 *
 */
export function udrParser(udr: UDR): {[key:string]: string}[] {
  const headers = udr.report_header;
  const rows = udr.report_row;

  const converted = rows.map((row, _i) =>
    R.reduce(
      (acc, [key, value]) => ({
        ...acc,
        [headers[key]["name"].replaceAll(" ", "_")]: parseValue(headers[key]["type"], value)
      }),
      {},
      R.toPairs(row) //converts array of objects to array of key/value pairs
    )
  );

  return converted;
}

/**
 * converts a string input from a Unifier UDR to the equivalent JS type from the type defined in the UDR's header.
 * @param type Java type returned as part of the UDR header
 * @param value value of the field from the UDR
 * @returns value in the equivalent JS type of the type input
 */

//? is there a need for Double and Integer to be parsed as Float/Int?
export function parseValue(type: string, value: string): string {
  switch (type) {
    case "java.lang.Double":
      // return parseFloat(value.replaceAll(",",""));
      return value.replaceAll(",","");
    case "java.lang.Integer":
      // return parseInt(value.replaceAll(",",""));
      return value.replaceAll(",","");
    default:
      return value;
  }
}
