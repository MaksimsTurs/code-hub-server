// @ts-nocheck

import { model, Types, Schema } from "mongoose";

import type { TCodeHubProject } from "./code-hub-project.model.type.js";

export default model(
	"projects", 
	new Schema<TCodeHubProject>({
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