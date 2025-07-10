import CodeHubProject from "@model/code-hub-project.model.js";
import safeAsyncCall from "@util/safe-async-call/safe-async-call.util.js";
import safeSyncCall from "@util/safe-sync-call/safe-sync-call.util.js";
import verifyJWTToken from "@util/verify-jwt-token.util.js";
import NUMBER_CONST from "@root/NUMBER.const.js";
import STRING_CONST from "@root/STRING.const.js";
export default async function getAllProjects(request, response, next) {
    const [accountId, errorByGettingAccountId] = safeSyncCall(function () {
        const [refreshToken, errorByGettinRefreshToken] = verifyJWTToken(request.cookies[STRING_CONST.AUTH_REFRESH_TOKEN_KEY], process.env.CODE_HUB_REFRESH_SECRET);
        if (errorByGettinRefreshToken) {
            throw errorByGettinRefreshToken;
        }
        return refreshToken?._id;
    });
    if (errorByGettingAccountId) {
        return next(errorByGettingAccountId);
    }
    const [codeHubProjects, errorByGettingCodeHubProjects] = await safeAsyncCall(async function () {
        const filters = !accountId ?
            { visibility: "public" } :
            {
                $or: [
                    { $and: [{ visibility: "protected", contributors: accountId }] },
                    { $and: [{ visibility: "public" }] },
                    { $and: [{ visibility: "private", owners: accountId }] }
                ]
            };
        return (await CodeHubProject.find(filters, { __v: false, owners: false, contributors: false, createdAt: false, updatedAt: false }));
    });
    if (errorByGettingCodeHubProjects) {
        return next(errorByGettingCodeHubProjects);
    }
    response.status(NUMBER_CONST.HTTP_OK).send(codeHubProjects);
}
;
