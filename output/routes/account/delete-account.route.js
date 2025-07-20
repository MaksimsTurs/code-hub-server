import { isValidObjectId } from "mongoose";
import mongodb from "../../services/mongodb/mongodb.service.js";
import HandledAPIError from "../../utils/Handled-API-Error.util.js";
import safeAsyncCall from "../../utils/safe-async-call/safe-async-call.util.js";
import { logger } from "../../index.js";
import STRING_CONST from "../../STRING.const.js";
import NUMBER_CONST from "../../NUMBER.const.js";
import RESPONSE_CONST from "../../RESPONSE.const.js";
import OBJECT_CONST from "../../OBJECT.const.js";
export default async function deleteAccount(request, response, next) {
    const _id = response.locals?.tokens?.accessJWTTToken?._id;
    if (!isValidObjectId(_id)) {
        throw new HandledAPIError(`"${_id}" is not valid object _id!`, "Account not found!", NUMBER_CONST.HTTP_NOT_FOUND);
    }
    logger.in("dev", "prod").info(`Removing account with _id "${_id}".`);
    const [_, errorByAccountDeleting] = await safeAsyncCall(async function () {
        await mongodb.models.Account.findByIdAndDelete(_id);
    });
    if (errorByAccountDeleting) {
        return next(errorByAccountDeleting);
    }
    response.cookie(STRING_CONST.AUTH_REFRESH_TOKEN_KEY, "", OBJECT_CONST.REFRESH_TOKEN_COOKIE_OPTIONS);
    response.status(200).send(RESPONSE_CONST[200]());
}
;
