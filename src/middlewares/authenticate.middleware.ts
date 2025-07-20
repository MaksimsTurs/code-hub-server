import type { Response, Request, NextFunction } from "express";
import type { TJWTAccountToken } from "../global.type.js";

import NUMBER_CONST from "../NUMBER.const.js";
import CONFIG_CONST from "../CONFIG.const.js";

import JWT from "../services/JWT/JWT.service.js";

import { logger } from "../index.js";
import HandledAPIError from "../utils/Handled-API-Error.util.js";
import getAccessToken from "../utils/get-access-token.util.js";

export default async function authenticate(request: Request, response: Response, next: NextFunction): Promise<void> {
	logger.in("dev", "prod").info(`Authentication on path ${request.url}.`);
	const rawAccessToken = getAccessToken(request.headers);

	if(!rawAccessToken) {
		throw new HandledAPIError(`Access token "${rawAccessToken}" is not defined!`, "You need to authorize first!", NUMBER_CONST.HTTP_FORBIDDEN);
	}

	const [accessToken, errorByVeryfyingToken] = JWT.verifyToken<TJWTAccountToken>(rawAccessToken, CONFIG_CONST.ACCESS_SECRET);

	if(errorByVeryfyingToken) {
		return next(errorByVeryfyingToken);
	}

	if(accessToken) {
		logger.in("dev", "prod").info("Successfuly authenticated.");
		response.locals.tokens = {...(response.locals?.tokens || {}), accessJWTTToken: accessToken };

		return next();
	}

	throw new HandledAPIError(`Access token "${accessToken}" is not defined!`, "You need to authorize first!", NUMBER_CONST.HTTP_FORBIDDEN);
};