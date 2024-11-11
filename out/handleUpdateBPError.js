/**
 * This function is called when the request itself returns successfully, but there is an error returned from unifier.
 * If this update also errors, it will not continue to loop.
 * @param unifier - Axios Instance pointing to Unifier REST API
 * @param event - event notification returned from Unifier REST API
 * @param update - response from unifier REST API call to updateBP
 *
 */
export async function handleUpdateBPError(logger, unifier, event, update) {
    const { message: messages, data, status } = update["data"];
    logger.info("handle error started");
    logger.info(JSON.stringify(status));
    logger.debug(JSON.stringify(messages));
    //as we are working on a per-BP basis, get the first and only message object from the array
    const { _record_status } = messages[0];
    //destructure event properties
    const { object_name, shell_number, record_no, workflow_to } = event;
    //create BP object to attempt to send BP to Error step
    const bp = {
        options: {
            project_number: shell_number,
            bpname: object_name,
            workflow_details: {
                WFCurrentStepName: "Submitted",
                WFActionName: "Error"
            }
        },
        data: [
            {
                record_no,
                ugenDescriptionMTL4000: _record_status
            }
        ]
    };
    logger.debug(JSON.stringify(bp));
    //attempt to update BP to error step.
    const updateToErrorStep = await unifier.put(`/ws/rest/service/v2/bp/record`, bp);
    //return true if the update request to the BP returns successfully
    if (updateToErrorStep.data.status !== 200) {
        logger.error("failed to update BP to error step");
        logger.error(JSON.stringify(updateToErrorStep.data));
    }
    logger.info("handle error finished");
    return updateToErrorStep;
}
//# sourceMappingURL=handleUpdateBPError.js.map