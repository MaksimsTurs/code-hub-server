import bcrypt from "bcrypt";
import safeAsyncCall from "../../utils/safe-async-call/safe-async-call.util.js";
import createJWTAccessToken from "../../utils/create-jwt-access-token.util.js";
import createJWTRefreshToken from "../../utils/create-jwt-refresh-token.util.js";
import HandledAPIError from "../../utils/Handled-API-Error.util.js";
import AccountModel from "../../models/account.model.js";
import NUMBER_CONST from "../../NUMBER.const.js";
import STRING_CONST from "../../STRING.const.js";
import OBJECT_CONST from "../../OBJECT.const.js";
export default async function signIn(request, response, next) {
    const [existingAccount, errorByVeryfiyngData] = await safeAsyncCall(async function () {
        const { name, email, password } = request.body;
        const maybeExistingAccount = await AccountModel.findOne({ name, email });
        if (!maybeExistingAccount) {
            throw new HandledAPIError(`Can not find account with name "${name}" and email "${email}"!`, "Account doesn't exist!", NUMBER_CONST.HTTP_NOT_FOUND);
        }
        if (!bcrypt.compareSync(password, maybeExistingAccount.password)) {
            throw new HandledAPIError("Password was incorrect!", "Password is not correct!", NUMBER_CONST.HTTP_BAD_REQUEST);
        }
        return maybeExistingAccount;
    });
    if (errorByVeryfiyngData) {
        return next(errorByVeryfiyngData);
    }
    const [accessToken, errorByCreatingAccessToken] = createJWTAccessToken({ _id: existingAccount._id });
    if (errorByCreatingAccessToken) {
        return next(errorByCreatingAccessToken);
    }
    const [refreshToken, errorByCreatingRefreshToken] = createJWTRefreshToken({ _id: existingAccount._id });
    if (errorByCreatingRefreshToken) {
        return next(errorByCreatingRefreshToken.message);
    }
    response.cookie(STRING_CONST.AUTH_REFRESH_TOKEN_KEY, refreshToken, OBJECT_CONST.REFRESH_TOKEN_COOKIE_OPTIONS);
    response.status(NUMBER_CONST.HTTP_OK).send({
        account: { _id: existingAccount._id, name: existingAccount.name, avatar: existingAccount.avatar, email: existingAccount.email },
        accessToken
    });
}
;
