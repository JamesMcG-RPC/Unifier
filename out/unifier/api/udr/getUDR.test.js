import axios from 'axios';
import { UnifierError } from '../../lib/UnifierError.js';
import { getUDR } from './getUDR.js';
const unifier = axios.create({
    baseURL: `${process.env.BASE_URL}`,
    headers: {
        Authorization: `Bearer ${process.env.UNIFIER_USER_TOKEN}`,
    },
});
test("test expected format with valid UDR and Project ID", async () => {
    const udr = await getUDR(unifier, "wbs_perf", `${process.env.TEST_PROJ_ID}`);
    expect(udr).toBeArray();
});
test("test expected format with valid UDR and invalid Project ID", async () => {
    const udr = getUDR(unifier, "wbs_perf2", "not real");
    await expect(udr).rejects.toThrowError(UnifierError);
    await expect(udr).rejects.toThrowError("Project/Shell Number is not correct.");
});
test("test expected format with invalid UDR at company level", async () => {
    const udr = getUDR(unifier, "wbs_perf2");
    await expect(udr).rejects.toThrowError(UnifierError);
    await expect(udr).rejects.toThrowError("Report name is not valid. Check if report exists or is enabled for Integration.");
});
//# sourceMappingURL=getUDR.test.js.map