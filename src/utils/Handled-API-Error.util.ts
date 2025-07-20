class HandledAPIError extends Error {
	public readonly serverMessage: string = "";
	public readonly clientMessage: string = "";
	public readonly code: number = 0;
	
	constructor(serverMessage: string, clientMessage: string, code: number) {
		super(serverMessage);

		this.serverMessage = serverMessage;
		this.clientMessage = clientMessage;
		this.code = code;

		Error.captureStackTrace(this, this.constructor);
	}
};

export default HandledAPIError;