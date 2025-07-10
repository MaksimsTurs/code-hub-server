import { isValidObjectId, Types } from "mongoose";
import safeAsyncCall from "@util/safe-async-call/safe-async-call.util.js";
import HandledAPIError from "@util/Handled-API-Error.util.js";
import AccountModel from "@model/account.model.js";
import NUMBER_CONST from "@root/NUMBER.const.js";
export default async function getAccountById(_id, projection, queryOptions) {
    return safeAsyncCall(async function () {
        _id = typeof _id === "string" ? new Types.ObjectId(_id) : _id;
        if (!isValidObjectId(_id)) {
            throw new HandledAPIError(`${_id} is not valid "_id" value!`, "You need sign up first!", NUMBER_CONST.HTTP_BAD_REQUEST);
        }
        const maybeExistingAccount = (await AccountModel.findById(_id, projection, queryOptions))?.toJSON();
        if (!maybeExistingAccount) {
            throw new HandledAPIError(`Can not find account by _id "${_id}"`, "Account not found!", NUMBER_CONST.HTTP_NOT_FOUND);
        }
        return maybeExistingAccount;
    });
}
;
