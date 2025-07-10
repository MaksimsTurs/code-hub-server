class UnhandledAPIError extends Error {
    serverMessage = "";
    clientMessage = "";
    constructor(message) {
        super(message);
        this.serverMessage = message;
        this.clientMessage = "Unhandled server Error!";
        Error.captureStackTrace(this, this.constructor);
    }
}
;
export default UnhandledAPIError;
