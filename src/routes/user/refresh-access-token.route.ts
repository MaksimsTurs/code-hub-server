// import type { Response, Request, NextFunction } from "express";
// import type { TJWTAccountToken } from "@root/global.type.js";

// import verifyJWTToken from "@util/verify-jwt-token.util.js";
// import createJWTAccessToken from "@util/create-jwt-access-token.util.js";
// import HandledAPIError from "@util/Handled-API-Error.util.js";

// import NUMBER_CONST from "@root/NUMBER.const.js";
// import STRING_CONST from "@root/STRING.const.js";

import type { Response, Request, NextFunction } from "express";
import type { TJWTAccountToken } from "../../global.type.js";

import verifyJWTToken from "../../utils/verify-jwt-token.util.js";
import createJWTAccessToken from "../../utils/create-jwt-access-token.util.js";
import HandledAPIError from "../../utils/Handled-API-Error.util.js";

import NUMBER_CONST from "../../NUMBER.const.js";
import STRING_CONST from "../../STRING.const.js";

export default function createNewAccessToken(request: Request, response: Response, next: NextFunction): void {
	const [refreshToken, errorByVerifyingToken] = verifyJWTToken<TJWTAccountToken>(request.cookies[STRING_CONST.AUTH_REFRESH_TOKEN_KEY], process.env.CODE_HUB_REFRESH_SECRET!);

	if(errorByVerifyingToken) {
		return next(errorByVerifyingToken);
	}

	if(!refreshToken) {
		throw new HandledAPIError(`Refresh token ${refreshToken} is not valid!`, "You need to sign up or sign in first!", NUMBER_CONST.HTTP_UNAUTHORIZED);
	}

	const [newAccessToken, errorByCreatingAccessToken] = createJWTAccessToken({ _id: refreshToken._id });

	if(errorByCreatingAccessToken) {
		return next(errorByCreatingAccessToken);
	}

	response.status(200).send({ accessToken: newAccessToken });
};