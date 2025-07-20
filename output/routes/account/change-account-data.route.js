import { isValidObjectId } from "mongoose";
import mongodb from "../../services/mongodb/mongodb.service.js";
import HandledAPIError from "../../utils/Handled-API-Error.util.js";
import safeAsyncCall from "../../utils/safe-async-call/safe-async-call.util.js";
import { logger } from "../../index.js";
import NUMBER_CONST from "../../NUMBER.const.js";
export default async function changeAccountData(request, response, next) {
    const _id = response.locals?.tokens?.accessJWTTToken?._id;
    if (!isValidObjectId(_id)) {
        throw new HandledAPIError(`"${_id}" is not valid object _id!`, "Account not found!", NUMBER_CONST.HTTP_NOT_FOUND);
    }
    if (_id !== request.params.accountId) {
        throw new HandledAPIError(`Account with _id "${_id}" try to change data from account "${request.params.accountId}"!`, "You have not permission!", NUMBER_CONST.HTTP_FORBIDDEN);
    }
    logger.in("dev", "prod").info(`Changing account data with _id "${_id}".`);
    const [updatedAccount, errorByUpdating] = await safeAsyncCall(async function () {
        return (await mongodb.models.Account.findByIdAndUpdate(_id, request.body, {
            new: true,
            projection: { password: false, __v: false },
            populate: { path: "projects", options: { projection: { __v: false } } }
        }))?.toJSON();
    });
    console.log(updatedAccount);
    if (errorByUpdating) {
        return next(errorByUpdating);
    }
    response.status(200).send(updatedAccount);
}
;
