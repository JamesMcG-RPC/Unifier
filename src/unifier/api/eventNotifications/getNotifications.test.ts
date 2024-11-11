import {jest} from '@jest/globals';
import axios from 'axios';
import { getNotifications } from './getNotifications.js';
jest.mock("axios")

test("valid request returns object with expected properties", async () => {
    const unifier = axios.create({
        baseURL: `${process.env.BASE_URL}`,
        headers: {
            Authorization:
                `Bearer ${process.env.UNIFIER_USER_TOKEN}`,
        },
    });
    const notifications = await getNotifications(unifier, {
        object_name: "Performance Snapshot",
        new_status: "Submitted"
    })
    expect(notifications).toHaveProperty("latest_event_date")
    expect(notifications).toHaveProperty("items")
    expect(notifications).toHaveProperty("total_records")
    expect(notifications).toHaveProperty("fetched_records")

})

test("invalid url", async () => {
    const unifier = axios.create({
        baseURL: "https://example.com/",
        headers: {
            Authorization:
                `Bearer ${process.env.UNIFIER_USER_TOKEN}`,
        },
    });
    const notifications = getNotifications(unifier, {
        object_name: "Performance Snapshot",
        new_status: "Submitted"
    })
    await expect(notifications).rejects.toThrowError()
})

test("valid url, invalid auth token", async () => {
    const unifier = axios.create({
        baseURL: "https://uni-demo03.rpc.uk.com",
        headers: {
            Authorization:
                `Bearer madeup`,
        },
    });
    const notifications = getNotifications(unifier, {
        object_name: "Performance Snapshot",
        new_status: "Submitted"
    })
    await expect(notifications).rejects.toThrowError()

    
    

})

test("axios request returns successfully but unifier response is an error", async () => {

    const mockedAxios = axios as jest.Mocked<typeof axios>;
    //mock the axios get function to simulate the unifier payload returning as an error
    (axios.get as jest.Mocked<{}>) = jest.fn().mockResolvedValue(({
        data: {status: 500}
    }) as never)
    const unifier = axios.create();
    const notifications = getNotifications(unifier, {
        object_name: "Performance Snapshot",
        new_status: "Submitted",
        
    })
    await expect(notifications).rejects.toThrowError()
    

})