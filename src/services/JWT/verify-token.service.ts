import type { TSafeSyncReturn } from "../../utils/safe-sync-call/safe-sync-call.util.type.js";
import type { VerifyOptions, JwtPayload } from "jsonwebtoken";

import jwt from "jsonwebtoken";

import safeSyncCall from "../../utils/safe-sync-call/safe-sync-call.util.js";

export default function verifyToken<R extends JwtPayload = any>(maybeValidJWTToken: string | undefined, secret: string, options?: VerifyOptions): TSafeSyncReturn<(R & JwtPayload) | null> {
	return safeSyncCall<R | null>(function() {
		maybeValidJWTToken = maybeValidJWTToken?.replace(/Bearer|undefined|null/, "")?.trim();
	
		if(!maybeValidJWTToken) {
			return null;
		}
	
		return jwt.verify(maybeValidJWTToken, secret, options) as R;
	});
};