import axios from 'axios';
import { UnifierError } from './UnifierError';
const unifier = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        Authorization: `Bearer ${process.env.UNIFIER_USER_TOKEN}`
    }
});
test("unifier response invalid, object properties not as expected", () => {
    const response = { data: { data: [], status: 500 } };
    const error = new UnifierError("test", response);
    expect(error.message).toEqual("Unknown Error has occurred");
});
//# sourceMappingURL=UnifierError.test.js.map