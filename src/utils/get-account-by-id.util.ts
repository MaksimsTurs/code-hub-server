// import type { ProjectionType, QueryOptions } from "mongoose";
// import type { TAccount } from "@root/models/account.model.type.js";
// import type { TSafeAsyncReturn } from "@util/safe-async-call/safe-async-call.util.type.js";

// import { isValidObjectId, Types } from "mongoose";

// import safeAsyncCall from "@util/safe-async-call/safe-async-call.util.js";
// import HandledAPIError from "@util/Handled-API-Error.util.js";

// import AccountModel from "@model/account.model.js";

// import NUMBER_CONST from "@root/NUMBER.const.js";

import type { ProjectionType, QueryOptions } from "mongoose";
import type { TAccount } from "../models/account.model.type.js";
import type { TSafeAsyncReturn } from "./safe-async-call/safe-async-call.util.type.js";

import { isValidObjectId, Types } from "mongoose";

import safeAsyncCall from "./safe-async-call/safe-async-call.util.js";
import HandledAPIError from "./Handled-API-Error.util.js";

import AccountModel from "../models/account.model.js";

import NUMBER_CONST from "../NUMBER.const.js";

export default async function getAccountById(_id: Types.ObjectId | string, projection?: ProjectionType<TAccount>, queryOptions?: QueryOptions<TAccount>): TSafeAsyncReturn<TAccount> {
	return safeAsyncCall(async function() {
		_id = typeof _id === "string" ? new Types.ObjectId(_id) : _id;

		if(!isValidObjectId(_id)) {
			throw new HandledAPIError(`${_id} is not valid "_id" value!`, "You need sign up first!", NUMBER_CONST.HTTP_BAD_REQUEST);
		}

		const maybeExistingAccount: TAccount | undefined = (await AccountModel.findById(_id, projection, queryOptions))?.toJSON();

		if(!maybeExistingAccount) {
			throw new HandledAPIError(`Can not find account by _id "${_id}"`, "Account not found!", NUMBER_CONST.HTTP_NOT_FOUND);
		}

		return maybeExistingAccount;
	});
};