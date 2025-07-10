import { Types } from "mongoose";
import { isValidObjectId } from "mongoose";
import AccountModel from "../../models/account.model.js";
import HandledAPIError from "../../utils/Handled-API-Error.util.js";
import safeAsyncCall from "../../utils/safe-async-call/safe-async-call.util.js";
import NUMBER_CONST from "../../NUMBER.const.js";
export default async function getAccountById(request, response, next) {
    if (!isValidObjectId(request.params?.userId)) {
        throw new HandledAPIError(`"${request.params?.userId}" id is not valid!`, "Account not found!", NUMBER_CONST.HTTP_NOT_FOUND);
    }
    const [account, errorByGettingAccount] = await safeAsyncCall(async function () {
        const _id = new Types.ObjectId(request.params.userId);
        return await AccountModel.findById(_id, { __v: false, password: false }, { populate: ["projects"] });
    });
    if (errorByGettingAccount) {
        return next(errorByGettingAccount);
    }
    if (!account) {
        throw new HandledAPIError(`Account "${account}" is not defined`, "Account not found!", NUMBER_CONST.HTTP_NOT_FOUND);
    }
    response.status(200).send(account);
}
;
