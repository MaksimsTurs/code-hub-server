import createNewProject from "./create-new-project.route.js";
import getAllProjects from "./get-all-projects.route.js";
import logIncomingRequestData from "../../middlewares/log-incoming-request-data.middleware.js";
import validateNewProjectData from "../../middlewares/validate-new-project-data.middleware.js";
import processCatchedError from "../../middlewares/process-catched-error.middleware.js";
import authenticate from "../../middlewares/authenticate.middleware.js";
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
};
