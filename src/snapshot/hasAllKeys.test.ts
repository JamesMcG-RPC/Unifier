import { hasAllKeys } from "./hasAllKeys.js";
import { performanceSnapshotReportRow } from "./performance/types.js";

test("all keys returns true", async () => {
  const hasKeys = hasAllKeys(
    performanceSnapshotReportRow,
    Object.keys(performanceSnapshotReportRow)
  );
  expect(hasKeys).toBeTrue();
});
test("no keys returns true", async () => {
  const hasKeys = hasAllKeys(performanceSnapshotReportRow, []);
  expect(hasKeys).toBeTrue();
});
test("object no keys returns false", async () => {
  const hasKeys = hasAllKeys({}, Object.keys(performanceSnapshotReportRow));
  expect(hasKeys).toBeFalse();
});
test("object missing keys returns false", async () => {
  const hasKeys = hasAllKeys(
    { Control_Account_Manager: "", cpi_hgh_thlds_bchd: "0", cpi_low_thlds_bchd: "0" },
    Object.keys(performanceSnapshotReportRow)
  );
  expect(hasKeys).toBeFalse();
});
test("object missing keys returns false", async () => {
  const hasKeys = hasAllKeys(
    { a:1, b:2 },
    ["a"]
  );
  expect(hasKeys).toBeTrue();
});

test("object missing keys returns false", async () => {
    const hasKeys = hasAllKeys(
      { b:2 },
      ["a"]
    );
    expect(hasKeys).toBeFalse();
  });
