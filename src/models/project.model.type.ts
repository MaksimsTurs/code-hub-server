import type { Types } from "mongoose";

export type TProject = {
	_id: Types.ObjectId
	name: string
	description: string
	visibility: EProjectVisibility
	owner: Types.ObjectId
	stars: Types.ObjectId[]
	contributors: Types.ObjectId[]
	createdAt: Date
	updatedAt: Date
};

export enum EProjectVisibility {
	PUBLIC    = "public",
	PRIVATE   = "private",
	PROTECTED = "protected"
};