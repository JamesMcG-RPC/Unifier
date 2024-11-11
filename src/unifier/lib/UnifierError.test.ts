import axios from 'axios';
import { UnifierResponse } from './types.js';
import { UnifierError } from './UnifierError';

const unifier = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
      Authorization: `Bearer ${process.env.UNIFIER_USER_TOKEN}`
    }
})

test("unifier response invalid, object properties not as expected", () => {
    const response = { data: { data: [], status: 500 }} as unknown as UnifierResponse
    const error = new UnifierError("test",response )
    expect(error.message).toEqual("Unknown Error has occurred")
})