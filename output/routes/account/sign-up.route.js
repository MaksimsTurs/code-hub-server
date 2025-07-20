import bcrypt from "bcrypt";
import { Types } from "mongoose";
import safeAsyncCall from "../../utils/safe-async-call/safe-async-call.util.js";
import mongodb from "../../services/mongodb/mongodb.service.js";
import JWT from "../../services/JWT/JWT.service.js";
import NUMBER_CONST from "../../NUMBER.const.js";
import STRING_CONST from "../../STRING.const.js";
import OBJECT_CONST from "../../OBJECT.const.js";
import { logger } from "../../index.js";
export default async function signUp(request, response, next) {
    const _id = new Types.ObjectId();
    logger.in("dev").info("Creating new JWT access token.");
    const [accessToken, errorByCreatingAccessToken] = JWT.createAccessToken({ _id });
    if (errorByCreatingAccessToken) {
        return next(errorByCreatingAccessToken);
    }
    logger.in("dev").info("Creating new JWT refresh token.");
    const [refreshToken, errorByCreatingRefreshToken] = JWT.createRefreshToken({ _id });
    if (errorByCreatingRefreshToken) {
        return next(errorByCreatingRefreshToken);
    }
    logger.in("dev").info("Creating new account.");
    const [newAccount, errorByCreatingAccount] = await safeAsyncCall(async function () {
        const { name, email, password } = request.body;
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());
        await mongodb.models.Account.create({ _id, name, email, password: hashedPassword, projects: [] });
        return { _id, name, email };
    });
    if (errorByCreatingAccount) {
        return next(errorByCreatingAccount);
    }
    response.cookie(STRING_CONST.AUTH_REFRESH_TOKEN_KEY, refreshToken, OBJECT_CONST.REFRESH_TOKEN_COOKIE_OPTIONS);
    response.status(NUMBER_CONST.HTTP_OK).send({ account: newAccount, accessToken });
}
;
