import { parseValue } from "./udrParser";
test("parseValue returns expected type", () => {
    expect(parseValue("java.lang.Double", "10.1")).toEqual(10.1);
    expect(parseValue("java.lang.Double", "1,000.1")).toEqual(1000.1);
    expect(parseValue("java.lang.Double", "1,000,000.1")).toEqual(1000000.1);
    expect(parseValue("java.lang.Double", "1,000,000,000.1")).toEqual(1000000000.1);
    expect(parseValue("java.lang.Double", "1,000,000,000,000.1")).toEqual(1000000000000.1);
    expect(parseValue("java.lang.Integer", "10")).toEqual(10);
    expect(parseValue("java.lang.String", "10")).toEqual("10");
});
//# sourceMappingURL=udrParser.test.js.map