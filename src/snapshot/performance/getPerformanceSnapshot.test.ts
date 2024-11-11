import axios from "axios";
import {jest} from '@jest/globals';
import { getPerformanceSnapshot } from "./getPerformanceSnapshot.js"
import { performanceSnapshotReportRow } from "./types.js";

jest.setTimeout(60000)
const unifier = axios.create({
    baseURL: `${process.env.BASE_URL}`,
    headers: {
        Authorization:
            `Bearer ${process.env.UNIFIER_USER_TOKEN}`,
    },
});
const shell_number = `${process.env.TEST_PROJ_ID}`
test("returns array", async () => {

    const snapshot = await getPerformanceSnapshot(unifier, shell_number)
    expect(snapshot).toBeArray()
})

test("report matches", async () => {

    const snapshot = await getPerformanceSnapshot(unifier, shell_number)
    for (const row of snapshot) {
        expect(Object.keys(row)).toEqual(expect.arrayContaining(Object.keys(performanceSnapshotReportRow)))
    }
})

