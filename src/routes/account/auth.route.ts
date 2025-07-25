import type { Request, Response, NextFunction } from "express";
import type { TJWTAccountToken } from "../../global.type.js";

import { isValidObjectId } from "mongoose";

import HandledAPIError from "../../utils/Handled-API-Error.util.js";

import { logger } from "../../index.js";

import JWT from "../../services/JWT/JWT.service.js";
import mongodb from "../../services/mongodb/mongodb.service.js";

import STRING_CONST from "../../STRING.const.js";
import CONFIG_CONST from "../../CONFIG.const.js";
import NUMBER_CONST from "../../NUMBER.const.js";

export default async function auth(request: Request, response: Response, next: NextFunction): Promise<void> {
	const rawRefreshToken = request.cookies[STRING_CONST.AUTH_REFRESH_TOKEN_KEY];

	if(!rawRefreshToken) {
		throw new HandledAPIError(`JWT Refresh token "${rawRefreshToken}" is not valid!`, "You need to registrate or log in first!", NUMBER_CONST.HTTP_UNAUTHORIZED);
	}

	logger.in("dev", "prod").info(`Verifying refresh token "${rawRefreshToken}".`);
	const [refreshToken, errorByVerifyingRefreshToken] = JWT.verifyToken<TJWTAccountToken>(rawRefreshToken, CONFIG_CONST.REFRESH_SECRET!);

	if(errorByVerifyingRefreshToken) {
		return next(errorByVerifyingRefreshToken);
	}

	if(!isValidObjectId(refreshToken?._id)) {
		throw new HandledAPIError(`"${refreshToken?._id}" is not valid object _id!`, "Incorrect id!", NUMBER_CONST.HTTP_BAD_REQUEST);
	}
	
	logger.in("dev", "prod").info(`Getting account with _id "${refreshToken!._id}".`);
	const [account, errorByGettingAccountById] = await mongodb.query.getById(mongodb.models.Account, refreshToken!._id, { name: true, avatar: true });
	
	if(errorByGettingAccountById) {
		return next(errorByGettingAccountById);
	}

	logger.in("dev", "prod").info("Creating new JWT access token.");
	const [newAccessToken, errorByCreatingAccessToken] = JWT.createAccessToken({ _id: account!._id });

	if(errorByCreatingAccessToken) {
		return next(errorByCreatingAccessToken);
	}

	response.status(200).send({ account, accessToken: newAccessToken });
};