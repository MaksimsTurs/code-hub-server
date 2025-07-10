import safeAsyncCall from "../../utils/safe-async-call/safe-async-call.util.js";
import getAccountById from "../../utils/get-account-by-id.util.js";
import CodeHubProject from "../../models/code-hub-project.model.js";
export default async function (request, response, next) {
    const [projectOwner, errorByGettingProjectOwner] = await getAccountById(response.locals.tokens.accessJWTTToken._id);
    if (errorByGettingProjectOwner) {
        return next(errorByGettingProjectOwner);
    }
    const [newProject, erroByCreatingProject] = await safeAsyncCall(async function () {
        const { name, description, visibility } = request.body;
        const { __v, ...projectData } = (await CodeHubProject.create({ name, description, visibility, contributors: [], owners: [projectOwner._id], stars: [] })).toJSON();
        return projectData;
    });
    if (erroByCreatingProject) {
        return next(erroByCreatingProject);
    }
    response.status(200).send(newProject);
}
;
