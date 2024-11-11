import { jest } from "@jest/globals";
import { parseArgs } from "./parseArgs.js";
describe("parseArgs valid arguments", () => {
    test("settings argument given, no other arguments given", async () => {
        let argv = ["process.execPath", "executed file", "--settings", "./test/settings-args-test.yaml"];
        const args = await parseArgs(argv);
        //check that settings property exists with correct value
        expect(args).toHaveProperty("settings", "./test/settings-args-test.yaml");
    });
    test("all other required arguments given", async () => {
        let argv = [
            "process.execPath",
            "executed file",
            "--token",
            "123",
            "--url",
            "https://rpc.uk.com",
            "--dbFile",
            "test.json",
            "--loggingLevel",
            "debug",
            "--frequency",
            "1000"
        ];
        const args = await parseArgs(argv);
        //check that settings property exists with correct value
        //check that default values are included
        expect(args).toHaveProperty("frequency", 1000);
        expect(args).toHaveProperty("loggingLevel", "debug");
        expect(args).toHaveProperty("url", "https://rpc.uk.com");
        expect(args).toHaveProperty("dbFile", "test.json");
        expect(args).toHaveProperty("token", "123");
    });
});
describe("parseArgs invalid arguments", () => {
    test("no arguments given", async () => {
        let argv = ["process.execPath", "executed file"];
        const mockError = jest.spyOn(console, "error").mockImplementation(() => { });
        await expect(parseArgs(argv, false)).rejects.toThrowError();
        expect(mockError).toHaveBeenCalledTimes(3);
        mockError.mockRestore();
    });
    test("not all arguments given", async () => {
        let argv = ["process.execPath", "executed file", "--token", "123"];
        const mockError = jest.spyOn(console, "error").mockImplementation(() => { });
        await expect(parseArgs(argv, false)).rejects.toThrowError();
        expect(mockError).toHaveBeenCalledTimes(3);
        mockError.mockRestore();
    });
});
//# sourceMappingURL=parseArgs.test.js.map