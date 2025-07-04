import type { Request, Response, NextFunction } from "express";

import safeAsyncCall from "@util/safe-async-call/safe-async-call.util.js";
import getAccountById from "@util/get-account-by-id.util.js";

import CodeHubProject from "@model/code-hub-project.model.js";

export default async function(request: Request, response: Response, next: NextFunction): Promise<void> {
	const [projectOwner, errorByGettingProjectOwner] = await getAccountById(response.locals.tokens.authToken._id);

	if(errorByGettingProjectOwner) {
		return next(errorByGettingProjectOwner);
	}

	const [newProject, erroByCreatingProject] = await safeAsyncCall(async function() {
		const { name, description, visibility } = request.body;

		const { __v, ...projectData } = (await CodeHubProject.create({ name, description, visibility, contributors: [], owners: [projectOwner!._id], stars: [] })).toJSON();

		return projectData;
	});

	if(erroByCreatingProject) {
		return next(erroByCreatingProject);
	}

	response.status(200).send(newProject);
};