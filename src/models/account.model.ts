import type { TAccount } from "./account.model.type.js";

import { model, Schema, Types } from "mongoose";

export default model("accounts", new Schema<TAccount>({
	name: {
		type: String
	},
	avatar: {
		type: String
	},
	projects: {
		type: [Types.ObjectId],
		ref: "projects"
	},
	email: {
		type: String
	},
	password: {
		type: String
	}
}, { timestamps: true }));