import type { Request, Response, NextFunction } from "express";
import type { TValidationErrorsObject } from "@root/utils/create-validation-errors-object/create-validation-errors-object.util.type";

import { errors } from "@vinejs/vine";

import logger from "@util/logger/logger.util.js";
import createValidationErrorsObject from "@util/create-validation-errors-object/create-validation-errors-object.util";
import HandledAPIError from "@util/Handled-API-Error.util.js";

import NUMBER_CONST from "@root/NUMBER.const.js";
import RESPONSE_CONST from "@root/RESPONSE.const.js";

export default function processCatchedError(error: any, _request: Request, response: Response, _next: NextFunction): void {
	if(error instanceof errors.E_VALIDATION_ERROR) {
		const errorsObject: TValidationErrorsObject = createValidationErrorsObject(error.messages);
		
		response.status(NUMBER_CONST.HTTP_VALIDATION_FAILURE).send(RESPONSE_CONST[422](undefined, { messages: errorsObject }));

		logger.error(error, errorsObject);
	} else if(error instanceof HandledAPIError) {
		response.status(error.code).send(RESPONSE_CONST[error.code as keyof typeof RESPONSE_CONST](error.clientMessage));
		logger.error(error.serverMessage);
	} else {
		response.status(NUMBER_CONST.HTTP_INTERNAL_SERVER_ERROR).send(RESPONSE_CONST[500]());

		logger.error(error);
	}
};