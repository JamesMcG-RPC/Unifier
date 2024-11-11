import {jest} from '@jest/globals';
import {createLogger, formatLog} from "./createLogger.js";


describe("log created", () => {
    test("log creates successfully with one transport", () => {
        const logger = createLogger("debug")
        expect(logger.transports.length).toEqual(1)
    })
})



describe("log formats", () => {

    test("log without label", () => {
        const log = {
            level: "debug",
            message: "test",
            timestamp: "2022-06-10 15:07:03.622"
        }
        const formatted = formatLog(log)
        expect(formatted).toMatch(/\[debug\] \d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3} - test/)

        
  })
    test("log with label", () => {
        const log = {
            level: "debug",
            message: "test",
            label: "label",
            timestamp: "2022-06-10 15:07:03.622"
        }
        const formatted = formatLog(log)
        expect(formatted).toMatch(/\[debug\] \d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3} - label - test/)

        
  })

  test("log with label", () => {
    const log = {
        level: "debug",
        message: {prop:"value"} as unknown as string,
        label: "label",
        timestamp: "2022-06-10 15:07:03.622"
    }
    const formatted = formatLog(log)
    expect(formatted).toMatch(/\[debug\] \d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3} - label - \[object Object\]/)

    
})
})
