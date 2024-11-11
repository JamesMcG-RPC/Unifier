import { parseValue, udrParser } from "./udrParser";

test("parseValue returns expected type", () => {
  expect(parseValue("java.lang.Double", "10.1")).toEqual("10.1");
  expect(parseValue("java.lang.Double", "1,000.1")).toEqual("1000.1");
  expect(parseValue("java.lang.Double", "1,000,000.1")).toEqual("1000000.1");
  expect(parseValue("java.lang.Double", "1,000,000,000.1")).toEqual("1000000000.1");
  expect(parseValue("java.lang.Double", "1,000,000,000,000.1")).toEqual("1000000000000.1");
  expect(parseValue("java.lang.Integer", "10")).toEqual("10");
  expect(parseValue("java.lang.String", "10")).toEqual("10");
});

test("udrParser works for simple input", () => {
  const udrResponse = {
    report_header: { c1: { name: "x", type: "java.lang.String" } },
    report_row: [{ c1: "test" }]
  };
  const parsed = udrParser(udrResponse);
  expect(parsed).toMatchObject([{ x: "test" }]);
});

test("udrParser changes spaces for underscores in header", () => {
    const udrResponse = {
      report_header: { c1: { name: "a b", type: "java.lang.String" } },
      report_row: [{ c1: "test" }]
    };
    const parsed = udrParser(udrResponse);
    expect(parsed).toMatchObject([{ a_b: "test" }]);
  });
