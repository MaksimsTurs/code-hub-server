// @ts-nocheck

import { model, Types, Schema } from "mongoose";

import type { TProject } from "./project.model.type.js";

export default model(
	"projects", 
	new Schema<TProject>({
		name: {
			type: String
		},
		description: {
			type: String
		},
		visibility: {
			type: String
		},
		stars: {
			type: [Types.ObjectId],
			ref: "accounts"
		},
		owners: {
			type: [Types.ObjectId],
			ref: "accounts"	
		},
		contributors: {
			type: [Types.ObjectId],
			ref: "accounts"
		}
	}, { timestamps: true })
);