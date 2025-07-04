import type { Response, Request, NextFunction } from "express";
import type { TAccount } from "@model/account.model.type.js";

import CodeHubProject from "@model/code-hub-project.model.js";

import safeAsyncCall from "@util/safe-async-call/safe-async-call.util.js";
import safeSyncCall from "@util/safe-sync-call/safe-sync-call.util.js";

import NUMBER_CONST from "@root/NUMBER.const.js";

export default async function getAllProjects(request: Request, response: Response<any, { accountData: TAccount | null }>, next: NextFunction): Promise<void> {
	const [getAllProjectsFilter, errorByCreatingFilter] = safeSyncCall(function() {
		const accountData: TAccount | null = response.locals.accountData;

		return !accountData ? 
			{ visibility: "public" } :
			{ 
				$or: [
					{ $and: [{ visibility: "protected", contributors: accountData._id }] }, 
					{ $and: [{ visibility: "public" }] },
					{ $and: [{ visibility: "private", owners: accountData._id }]}
				] 
			};
	});

	if(errorByCreatingFilter) {
		next(errorByCreatingFilter);
	}

	const [codeHubProjects, errorByGettingCodeHubProjects] = await safeAsyncCall(async function() {
		return (await CodeHubProject.find(getAllProjectsFilter!, { __v: false, owners: false, contributors: false, createdAt: false, updatedAt: false }));
	});

	if(errorByGettingCodeHubProjects) {
		next(errorByGettingCodeHubProjects);
	}

	response.status(NUMBER_CONST.HTTP_OK).send(codeHubProjects);
};