import jwt from "jsonwebtoken";
import safeSyncCall from "@root/utils/safe-sync-call/safe-sync-call.util.js";
import STRING_CONST from "../../STRING.const.js";
import CONFIG_CONST from "../../CONFIG.const.js";
export default function createRefreshToken(payload) {
    return safeSyncCall(function () {
        return jwt.sign(payload, CONFIG_CONST.REFRESH_SECRET, { expiresIn: STRING_CONST.AUTH_REFRESH_TOKEN_EXPIRED });
    });
}
;
