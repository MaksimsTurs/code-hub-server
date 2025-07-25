import type { Response, Request, NextFunction } from "express";
import type { TAccount } from "../../models/account.model.type.js";

import { Types } from "mongoose";

import mongodb from "../../services/mongodb/mongodb.service.js";
import JWT from "../../services/JWT/JWT.service.js";

import { logger } from "../../index.js";

import safeAsyncCall from "../../utils/safe-async-call/safe-async-call.util.js";
import HandledAPIError from "../../utils/Handled-API-Error.util.js";

import NUMBER_CONST from "../../NUMBER.const.js";
import STRING_CONST from "../../STRING.const.js";

export default async function getAllProjects(request: Request, response: Response<any, { accountData: TAccount | null }>, next: NextFunction): Promise<void> {
	const rawRefreshToken = request.cookies[STRING_CONST.AUTH_REFRESH_TOKEN_KEY];

	if(!rawRefreshToken) {
		throw new HandledAPIError(`JWT Refresh token "${rawRefreshToken}" is not valid!`, "You need to registrate or log in first!", NUMBER_CONST.HTTP_UNAUTHORIZED);
	}
	
	logger.in("dev").info(`Verifying refresh token "${rawRefreshToken}".`);
	const [refreshToken, errorByGettingRefreshToken] = JWT.verifyToken<TAccount>(rawRefreshToken, process.env.CODE_HUB_REFRESH_SECRET!);

	if(errorByGettingRefreshToken) {
		return next(errorByGettingRefreshToken);
	}

	logger.in("dev").info("Creating filter and get projects.");
	const [projects, errorByGettingProjects] = await safeAsyncCall(async function() {
		const _id: Types.ObjectId = new Types.ObjectId(refreshToken?._id);

		const filters = !_id ? 
			{ visibility: "public" } :
			{ 
				$or: [
					{ $and: [{ visibility: "public", owner: _id }] },
					{ $and: [{ visibility: "protected", contributors: _id }] }, 
					{ $and: [{ visibility: "protected", owner: _id }] },
					{ $and: [{ visibility: "private", owner: _id }]}
				] 
			};

		logger.in("dev").info("Filters", filters);
		return (await mongodb.models.Project.find(filters, { __v: false, owner: false, contributors: false, createdAt: false, updatedAt: false }));
	});

	if(errorByGettingProjects) {
		return next(errorByGettingProjects);
	}

	response.status(NUMBER_CONST.HTTP_OK).send(projects);
};