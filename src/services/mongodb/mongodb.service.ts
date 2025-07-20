import Account from "../../models/account.model.js";
import Project from "../../models/project.model.js";

import connectToMongoDb from "./connect.service.js";

import getById from "./get-by-id.service.js";

export default {
	connect: connectToMongoDb,
	query: {
		getById,
	},
	models: {
		Account,
		Project
	}
} as const;