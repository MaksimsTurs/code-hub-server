import bcrypt from "bcrypt";
import { Types } from "mongoose";
import safeAsyncCall from "../../utils/safe-async-call/safe-async-call.util.js";
import createJWTAccessToken from "../../utils/create-jwt-access-token.util.js";
import createJWTRefreshToken from "../../utils/create-jwt-refresh-token.util.js";
import AccountModel from "../../models/account.model.js";
import NUMBER_CONST from "../../NUMBER.const.js";
import STRING_CONST from "../../STRING.const.js";
import OBJECT_CONST from "../../OBJECT.const.js";
export default async function signUp(request, response, next) {
    const _id = new Types.ObjectId();
    const [accessToken, errorByCreatingAccessToken] = createJWTAccessToken({ _id });
    if (errorByCreatingAccessToken) {
        return next(errorByCreatingAccessToken);
    }
    const [refreshToken, errorByCreatingRefreshToken] = createJWTRefreshToken({ _id });
    if (errorByCreatingRefreshToken) {
        return next(errorByCreatingRefreshToken);
    }
    const [newAccount, errorByCreatingAccount] = await safeAsyncCall(async function () {
        const { name, email, password } = request.body;
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());
        await AccountModel.create({ _id, name, email, password: hashedPassword, codeHubs: [] });
        return { _id, name, email };
    });
    if (errorByCreatingAccount) {
        return next(errorByCreatingAccount);
    }
    response.cookie(STRING_CONST.AUTH_REFRESH_TOKEN_KEY, refreshToken, OBJECT_CONST.REFRESH_TOKEN_COOKIE_OPTIONS);
    response.status(NUMBER_CONST.HTTP_OK).send({ account: newAccount, accessToken });
}
;
