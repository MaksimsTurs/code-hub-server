import NUMBER_CONST from "./NUMBER.const.js";
import CONFIG_CONST from "./CONFIG.const.js";

export default {
	REFRESH_TOKEN_COOKIE_OPTIONS: { 
		expires: new Date(Date.now() + NUMBER_CONST.ONE_WEEK_MILLISECONDS), 
		path: "/", 
		secure: true, 
		httpOnly: true, 
		sameSite: "none" 
	},
	CORS: {
		credentials: true, 
		origin: CONFIG_CONST.ORIGINS
	}
} as const;