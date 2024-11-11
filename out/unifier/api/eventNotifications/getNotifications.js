import { UnifierError } from "./../../lib/UnifierError.js";
/**
 *
 * @param unifier - Axios Instance pointing to Unifier REST API
 * @param filter - event notification filter object
 * @returns event notification data
 */
export async function getNotifications(unifier, filter) {
    try {
        const notifications = await unifier.get("/ws/rest/service/v1/event/notification", {
            params: { filter }
        });
        //The REST request can return successfully, but the response from unifier can still be an error.
        //check if unifier response is successful. If so, return the data payload. If not, throw an error.
        if (notifications.data.status == 200) {
            return notifications.data.data;
        }
        else {
            throw new UnifierError("getNotifications", notifications);
        }
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=getNotifications.js.map