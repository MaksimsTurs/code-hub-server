import type { Response, Request, NextFunction } from "express";
import type { TJWTAccountToken } from "@root/global.type.js";

import NUMBER_CONST from "@root/NUMBER.const.js";

import HandledAPIError from "@util/Handled-API-Error.util.js";
import verifyJWTToken from "@util/verify-jwt-token.util.js";
import getAccessToken from "@util/get-access-token.util.js";

export default async function authenticate(request: Request, response: Response, next: NextFunction): Promise<void> {
	const [accessToken, errorByVeryfyingToken] = verifyJWTToken<TJWTAccountToken>(getAccessToken(request.headers), process.env.CODE_HUB_ACCESS_SECRET!);

	if(errorByVeryfyingToken) {
		return next(errorByVeryfyingToken);
	}

	if(accessToken) {
		response.locals.tokens = {...(response.locals?.tokens || {}), accessJWTTToken: accessToken };

		return next();
	}

	throw new HandledAPIError(`Access token "${accessToken}" is not defined!`, "You need to authorize first!", NUMBER_CONST.HTTP_FORBIDDEN);
};