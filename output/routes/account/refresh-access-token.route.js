import { isValidObjectId } from "mongoose";
import JWT from "../../services/JWT/JWT.service.js";
import HandledAPIError from "../../utils/Handled-API-Error.util.js";
import NUMBER_CONST from "../../NUMBER.const.js";
import CONFIG_CONST from "../../CONFIG.const.js";
import STRING_CONST from "../../STRING.const.js";
import { logger } from "../../index.js";
export default function refreshAccessToken(request, response, next) {
    const rawRefreshToken = request.cookies[STRING_CONST.AUTH_REFRESH_TOKEN_KEY];
    if (!rawRefreshToken) {
        throw new HandledAPIError(`JWT Refresh token "${rawRefreshToken}" is not valid!`, "You need to registrate or log in first!", NUMBER_CONST.HTTP_UNAUTHORIZED);
    }
    logger.in("dev").info(`Verifying refresh token "${rawRefreshToken}".`);
    const [refreshToken, errorByVerifyingToken] = JWT.verifyToken(rawRefreshToken, CONFIG_CONST.REFRESH_SECRET);
    if (errorByVerifyingToken) {
        return next(errorByVerifyingToken);
    }
    if (!isValidObjectId(refreshToken?._id)) {
        throw new HandledAPIError(`"${refreshToken?._id}" is not valid object _id!`, "Incorrect id!", NUMBER_CONST.HTTP_BAD_REQUEST);
    }
    logger.in("dev").info("Creating new JWT access token.");
    const [newAccessToken, errorByCreatingAccessToken] = JWT.createAccessToken({ _id: refreshToken._id });
    if (errorByCreatingAccessToken) {
        return next(errorByCreatingAccessToken);
    }
    response.status(200).send({ accessToken: newAccessToken });
}
;
