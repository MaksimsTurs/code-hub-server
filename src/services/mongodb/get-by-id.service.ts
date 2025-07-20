import type { ProjectionType, QueryOptions, Model } from "mongoose";
import type { TSafeAsyncReturn } from "../../utils/safe-async-call/safe-async-call.util.type.js";

import { isValidObjectId, Types } from "mongoose";

import safeAsyncCall from "../../utils/safe-async-call/safe-async-call.util.js";
import HandledAPIError from "../../utils/Handled-API-Error.util.js";

import NUMBER_CONST from "../../NUMBER.const.js";

export default async function getById<M>(model: Model<M>, _id: Types.ObjectId | string, projection?: ProjectionType<M>, queryOptions?: QueryOptions<M>): TSafeAsyncReturn<M | null> {
	return safeAsyncCall(async function() {
		_id = typeof _id === "string" ? new Types.ObjectId(_id) : _id;

		if(!isValidObjectId(_id)) {
			throw new HandledAPIError(`${_id} is not valid "_id" value!`, "Id is not correct!", NUMBER_CONST.HTTP_BAD_REQUEST);
		}

		const account = (await model.findById(_id, projection, queryOptions))?.toJSON() as M | null

		return account;
	});
};