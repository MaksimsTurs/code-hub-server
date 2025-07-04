import type { Types } from "mongoose";

export type TCodeHubProject = {
	_id: Types.ObjectId
	name: string
	description: string
	visibility: TCodeHubProjectVisibility
	stars: Types.ObjectId[]
	owners: Types.ObjectId[]
	contributors: Types.ObjectId[]
	createdAt: Date
	updatedAt: Date
};

export type TCodeHubProjectVisibility = "public" | "private" | "protected";