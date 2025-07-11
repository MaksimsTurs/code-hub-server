// import type { TSafeSyncReturn } from "@util/safe-sync-call/safe-sync-call.util.type.js";
// import type { VerifyOptions, JwtPayload } from "jsonwebtoken";

// import jwt from "jsonwebtoken";

// import safeSyncCall from "@util/safe-sync-call/safe-sync-call.util.js";

import type { TSafeSyncReturn } from "./safe-sync-call/safe-sync-call.util.type.js";
import type { VerifyOptions, JwtPayload } from "jsonwebtoken";

import jwt from "jsonwebtoken";

import safeSyncCall from "./safe-sync-call/safe-sync-call.util.js";

export default function verifyJWTToken<R extends JwtPayload = any>(maybeValidJWTToken: string | undefined, secret: string, options?: VerifyOptions): TSafeSyncReturn<(R & JwtPayload) | null> {
	return safeSyncCall<R | null>(function() {
		maybeValidJWTToken = maybeValidJWTToken?.replace(/Bearer|undefined|null/, "")?.trim();
	
		if(!maybeValidJWTToken) {
			return null;
		}
	
		return jwt.verify(maybeValidJWTToken, secret, options) as R;
	});
};