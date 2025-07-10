import NUMBER_CONST from "./NUMBER.const.js";

export default {
	REFRESH_TOKEN_COOKIE_OPTIONS: { expires: new Date(Date.now() + NUMBER_CONST.ONE_WEEK_MILLISECONDS), path: "/", secure: true, httpOnly: true }
} as const;