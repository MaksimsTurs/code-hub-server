import type { Request, Response, NextFunction } from "express";

import { errors } from "@vinejs/vine";

import logger from "@util/logger/logger.util.js";
import HandledAPIError from "@util/Handled-API-Error.util.js";

import NUMBER_CONST from "@root/NUMBER.const.js";
import RESPONSE_CONST from "@root/RESPONSE.const.js";

export default function processCatchedError(error: any, _request: Request, response: Response, _next: NextFunction): void {
	if(error instanceof errors.E_VALIDATION_ERROR) {
		const firstError: any = error.messages.at(0);
		const errorMessage: string = firstError.message;

		response.status(NUMBER_CONST.HTTP_VALIDATION_FAILURE).send(RESPONSE_CONST[422](errorMessage));

		logger.error(error, firstError);
	} else if(error instanceof HandledAPIError) {
		response.status(error.code).send(RESPONSE_CONST[error.code as keyof typeof RESPONSE_CONST](error.clientMessage));
		logger.error(error.serverMessage);
	} else {
		response.status(NUMBER_CONST.HTTP_INTERNAL_SERVER_ERROR).send(RESPONSE_CONST[500]());

		logger.error(error);
	}
};