import type { TSafeSyncReturn } from "../../utils/safe-sync-call/safe-sync-call.util.type.js";
import type { TJWTAccountToken } from "../../global.type.js";

import jwt from "jsonwebtoken";

import safeSyncCall from "../../utils/safe-sync-call/safe-sync-call.util.js";

import CONFIG_CONST from "../../CONFIG.const.js";
import STRING_CONST from "../../STRING.const.js";

export default function createAccessToken(payload: TJWTAccountToken): TSafeSyncReturn<string> {
	return safeSyncCall(function() {
		return jwt.sign(payload, CONFIG_CONST.ACCESS_SECRET!, { expiresIn: STRING_CONST.AUTH_ACCESS_TOKEN_EXPIRED });
	});
};