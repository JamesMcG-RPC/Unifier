import axios from "axios";
import {jest} from '@jest/globals';
import { getP2PSnapshot } from "./getP2PSnapshot.js"
import { p2pSnapshotReportRow } from "./types.js";
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

    const snapshot = await getP2PSnapshot(unifier, shell_number)
    expect(snapshot).toBeArray()
})

test("report matches", async () => {

    const udr = await getUDR(unifier, "Yearly Forecast Snapshot")
    for (const row of udr) {
        expect(Object.keys(row)).toEqual(expect.arrayContaining(Object.keys(p2pSnapshotReportRow)))
    }
})
