import jwt from "jsonwebtoken";
import safeSyncCall from "../../utils/safe-sync-call/safe-sync-call.util.js";
export default function verifyToken(maybeValidJWTToken, secret, options) {
    return safeSyncCall(function () {
        maybeValidJWTToken = maybeValidJWTToken?.replace(/Bearer|undefined|null/, "")?.trim();
        if (!maybeValidJWTToken) {
            return null;
        }
        return jwt.verify(maybeValidJWTToken, secret, options);
    });
}
;
