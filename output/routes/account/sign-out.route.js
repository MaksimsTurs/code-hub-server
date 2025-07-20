import { logger } from "../../index.js";
import STRING_CONST from "../../STRING.const.js";
import RESPONSE_CONST from "../../RESPONSE.const.js";
export default async function signOut(request, response, _next) {
    logger.in("dev", "prod").info(`Account with JWT Refresh token "${request.cookies[STRING_CONST.AUTH_REFRESH_TOKEN_KEY]}" sign out from the system.`);
    response.cookie(STRING_CONST.AUTH_REFRESH_TOKEN_KEY, "");
    response.status(200).send(RESPONSE_CONST[200]());
}
;
