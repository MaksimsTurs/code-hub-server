// import type { TSafeSyncReturn } from "@util/safe-sync-call/safe-sync-call.util.type.js";

// import jwt from "jsonwebtoken";

// import safeSyncCall from "@util/safe-sync-call/safe-sync-call.util.js";

// import STRING_CONST from "@root/STRING.const.js";

import type { TSafeSyncReturn } from "./safe-sync-call/safe-sync-call.util.type.js";

import jwt from "jsonwebtoken";

import safeSyncCall from "./safe-sync-call/safe-sync-call.util.js";

import STRING_CONST from "../STRING.const.js";

export default function createJWTRefreshToken(payload: any): TSafeSyncReturn<string> {
	return safeSyncCall(function() {
		return jwt.sign(payload, process.env.CODE_HUB_REFRESH_SECRET!, { expiresIn: STRING_CONST.AUTH_REFRESH_TOKEN_EXPIRED });
	});
}