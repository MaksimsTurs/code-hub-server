import jwt from "jsonwebtoken";
import safeSyncCall from "@util/safe-sync-call/safe-sync-call.util.js";
import STRING_CONST from "@root/STRING.const.js";
export default function createJWTAccessToken(payload) {
    return safeSyncCall(function () {
        return jwt.sign(payload, process.env.CODE_HUB_ACCESS_SECRET, { expiresIn: STRING_CONST.AUTH_ACCESS_TOKEN_EXPIRED });
    });
}
;
