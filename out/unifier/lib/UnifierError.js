export class UnifierError extends Error {
    status;
    message;
    constructor(name, response) {
        const message = response?.["data"]?.["message"]?.[0] || "Unknown Error has occurred";
        super(JSON.stringify(message));
        this.name = name;
        this.status = response["data"]["status"];
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
//# sourceMappingURL=UnifierError.js.map