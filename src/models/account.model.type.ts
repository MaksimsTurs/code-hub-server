import type { Types } from "mongoose";

export type TAccount = {
	_id: Types.ObjectId
	name: string
	email: string
	avatar: string
	projects: Types.ObjectId[]
	password: string
	accessToken: string
};