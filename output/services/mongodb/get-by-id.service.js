import { isValidObjectId, Types } from "mongoose";
import safeAsyncCall from "../../utils/safe-async-call/safe-async-call.util.js";
import HandledAPIError from "../../utils/Handled-API-Error.util.js";
import NUMBER_CONST from "../../NUMBER.const.js";
export default async function getById(model, _id, projection, queryOptions) {
    return safeAsyncCall(async function () {
        _id = typeof _id === "string" ? new Types.ObjectId(_id) : _id;
        if (!isValidObjectId(_id)) {
            throw new HandledAPIError(`"${_id}" is not valid ObjectId!`, "Some data is incorrect!", NUMBER_CONST.HTTP_BAD_REQUEST);
        }
        return (await model.findById(_id, projection, queryOptions))?.toJSON();
    });
}
;
