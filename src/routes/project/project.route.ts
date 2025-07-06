import createNewProject from "./create-new-project.route.js";
import getAllProjects from "./get-all-projects.route.js";

import logIncomingRequestData from "@middleware/log-incoming-request-data.middleware.js";
import validateNewProjectData from "@middleware/validate-new-project-data.middleware.js";
import processCatchedError from "@middleware/process-catched-error.middleware.js";
import authenticate from "@middleware/authenticate.middleware.js";

export default {
	create: [
		logIncomingRequestData,
		authenticate,
		validateNewProjectData,
		createNewProject,
		processCatchedError
	],
	getAllProjects: [
		logIncomingRequestData, 
		getAllProjects, 
		processCatchedError
	]
} as const;