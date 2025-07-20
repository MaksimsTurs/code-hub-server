import type { Types } from "mongoose"

export type TLoggerModes = "prod" | "dev";

export type TJWTAccountToken = {
	_id: Types.ObjectId
};