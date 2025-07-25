import type { Request, Response, NextFunction } from "express";

import safeAsyncCall from "../../utils/safe-async-call/safe-async-call.util.js";

import mongodb from "../../services/mongodb/mongodb.service.js";

import { logger } from "../../index.js";

export default async function(request: Request, response: Response, next: NextFunction): Promise<void> {
	logger.in("dev").info(`Get project owner with _id "${response.locals.tokens.accessJWTTToken._id}".`);
	const [projectOwner, errorByGettingProjectOwner] = await mongodb.query.getById(mongodb.models.Account, response.locals.tokens.accessJWTTToken._id);

	if(errorByGettingProjectOwner) {
		return next(errorByGettingProjectOwner);
	}

	logger.in("dev").info("Creating new project.");
	const [newProject, erroByCreatingProject] = await safeAsyncCall(async function() {
		const { name, description, visibility } = request.body;

		const { __v, ...projectData } = (await mongodb.models.Project.create({ 
			name, 
			description, 
			visibility, 
			contributors: [], 
			owner: projectOwner!._id, 
			stars: [] 
		})).toJSON();

		return projectData;
	});

	if(erroByCreatingProject) {
		return next(erroByCreatingProject);
	}

	logger.in("dev").info("Insert the new project _id to the owner \"projects\" field.");
	const [_, errorByInsertingProjectId] = await safeAsyncCall(async function() {
		await mongodb.models.Account.findByIdAndUpdate(projectOwner!._id, { $push: { projects: newProject!._id }});
	});

	if(errorByInsertingProjectId) {
		return next(errorByInsertingProjectId);
	}

	response.status(200).send(newProject);
};