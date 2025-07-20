import type { Request, Response, NextFunction } from "express";

import bcrypt from "bcrypt";

import safeAsyncCall from "../../utils/safe-async-call/safe-async-call.util.js";
import HandledAPIError from "../../utils/Handled-API-Error.util.js";

import mongodb from "../../services/mongodb/mongodb.service.js";
import JWT from "../../services/JWT/JWT.service.js";

import { logger } from "../../index.js";

import NUMBER_CONST from "../../NUMBER.const.js";
import STRING_CONST from "../../STRING.const.js";
import OBJECT_CONST from "../../OBJECT.const.js";

export default async function signIn(request: Request, response: Response, next: NextFunction): Promise<void> {
	logger.in("dev").info(`Check if user with name "${request.body.name}" and "${request.body.email}" exist.`);
	const [existingAccount, errorByVeryfiyngData] = await safeAsyncCall(async function() {
		const { name, email } = request.body;

		return await mongodb.models.Account.findOne({ name, email });
	});

	if(errorByVeryfiyngData) {
		return next(errorByVeryfiyngData);
	}

	if(!existingAccount) {
		throw new HandledAPIError(`Can not find account with name "${request.body.name}" and email "${request.body.email}"!`, "Account doesn't exist!", NUMBER_CONST.HTTP_NOT_FOUND);
	}

	logger.in("dev").info("Check password matching.");
	if(!bcrypt.compareSync(request.body.password, existingAccount.password)) {
		throw new HandledAPIError("Passwords doesn't match!", "Passwords doesn't match!", NUMBER_CONST.HTTP_BAD_REQUEST);
	}

	logger.in("dev").info("Creating new JWT access token.");
	const [accessToken, errorByCreatingAccessToken] = JWT.createAccessToken({ _id: existingAccount!._id });
	
	if(errorByCreatingAccessToken) {
		return next(errorByCreatingAccessToken);
	}

	logger.in("dev").info("Creating new JWT refresh token.");
	const [refreshToken, errorByCreatingRefreshToken] = JWT.createRefreshToken({ _id: existingAccount!._id });

	if(errorByCreatingRefreshToken) {
		return next(errorByCreatingRefreshToken.message);
	}

	response.cookie(STRING_CONST.AUTH_REFRESH_TOKEN_KEY, refreshToken, OBJECT_CONST.REFRESH_TOKEN_COOKIE_OPTIONS);
	response.status(NUMBER_CONST.HTTP_OK).send({
		account: { _id: existingAccount!._id, name: existingAccount!.name, avatar: existingAccount!.avatar, email: existingAccount!.email },
		accessToken 
	});
};