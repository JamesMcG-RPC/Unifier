import axios from "axios";
import {jest} from '@jest/globals';
import { getCTSnapshot } from "./getCTSnapshot.js"
import { ctSnapshotReportRow } from "./types.js";
import { getUDR } from "../../unifier/api/udr/getUDR.js";

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

    const snapshot = await getCTSnapshot(unifier)
    expect(snapshot).toBeArray()
})

test("report matches", async () => {

    const udr = await getUDR(unifier, "CT Snapshot")
    for (const row of udr) {
        expect(Object.keys(row)).toEqual(expect.arrayContaining(Object.keys(ctSnapshotReportRow)))
    }
})