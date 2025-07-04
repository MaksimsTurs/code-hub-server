class UnhandledAPIError extends Error {
	public readonly serverMessage: string = "";
	public readonly clientMessage: string = "";
	
	constructor(message: any) {
		super(message);

		this.serverMessage = message;
		this.clientMessage = "Unhandled server Error!";

		Error.captureStackTrace(this, this.constructor);
	}
};

export default UnhandledAPIError;