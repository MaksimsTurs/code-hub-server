import NUMBER_CONST from "../NUMBER.const.js";
import HandledAPIError from "../utils/Handled-API-Error.util.js";
import verifyJWTToken from "../utils/verify-jwt-token.util.js";
import getAccessToken from "../utils/get-access-token.util.js";
export default async function authenticate(request, response, next) {
    const [accessToken, errorByVeryfyingToken] = verifyJWTToken(getAccessToken(request.headers), process.env.CODE_HUB_ACCESS_SECRET);
    if (errorByVeryfyingToken) {
        return next(errorByVeryfyingToken);
    }
    if (accessToken) {
        response.locals.tokens = { ...(response.locals?.tokens || {}), accessJWTTToken: accessToken };
        return next();
    }
    throw new HandledAPIError(`Access token "${accessToken}" is not defined!`, "You need to authorize first!", NUMBER_CONST.HTTP_FORBIDDEN);
}
;
