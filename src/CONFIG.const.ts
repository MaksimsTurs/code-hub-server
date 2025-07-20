import dotenv from "dotenv";

dotenv.config();

const isDev: boolean = (process.env.CODE_HUB_MODE?.trim() || "prod") === "dev";

export default {
	IS_DEV:         isDev,
	MODE:           (process.env.CODE_HUB_MODE!.trim() || "dev")                                                   as string,
	ACCESS_SECRET:  (process.env.CODE_HUB_ACCESS_SECRET!.trim())                                                   as string,
	REFRESH_SECRET: (process.env.CODE_HUB_REFRESH_SECRET!.trim())                                                  as string,
	PORT:           (process.env.CODE_HUB_SERVER_DEV_PORT!.trim())                                                 as string,
	ORIGINS:        (isDev ? process.env.CODE_HUB_DEV_ORIGINS!.trim() : process.env.CODE_HUB_PROD_ORIGINS!.trim()) as string,
	MONGODB_URI:    (isDev ? process.env.MONGODB_DEV_URI!.trim() : process.env.MONGODB_PROD_URI!.trim())           as string
} as const;