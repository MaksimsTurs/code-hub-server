class HandledAPIError extends Error {
    serverMessage = "";
    clientMessage = "";
    code = 0;
    constructor(serverMessage, clientMessage, code) {
        super(serverMessage);
        this.serverMessage = serverMessage;
        this.clientMessage = clientMessage;
        this.code = code;
        Error.captureStackTrace(this, this.constructor);
    }
}
;
export default HandledAPIError;
