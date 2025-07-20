
import type { Request, Response, NextFunction } from "express";

import mongodb from "../../services/mongodb/mongodb.service.js";

import { logger } from "../../index.js";

import HandledAPIError from "../../utils/Handled-API-Error.util.js";

import NUMBER_CONST from "../../NUMBER.const.js";

export default async function getAccountById(request: Request, response: Response, next: NextFunction): Promise<void> {
	logger.in("dev").info(`Getting account with _id "${request.params.userId}"`);
	const [account, errorByGettingAccount] = await mongodb.query.getById(
		mongodb.models.Account, 
		request.params.userId, 
		{ password: false, __v: false }, 
		{ populate: { path: "projects", options: { projection: { __v: false }}}}
	);

	if(errorByGettingAccount) {
		return next(errorByGettingAccount);
	}

	if(!account) {
		throw new HandledAPIError(`Account with _id "${request.params.userId}" not exist`, "Account not found!", NUMBER_CONST.HTTP_NOT_FOUND);
	}

	response.status(200).send(account);
};