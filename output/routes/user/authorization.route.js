import getAccountById from "@util/get-account-by-id.util.js";
import verifyJWTToken from "@util/verify-jwt-token.util.js";
import createJWTAccessToken from "@util/create-jwt-access-token.util.js";
import HandledAPIError from "@util/Handled-API-Error.util.js";
import STRING_CONST from "@root/STRING.const.js";
import NUMBER_CONST from "@root/NUMBER.const.js";
export default async function authorization(request, response, next) {
    const [refreshToken, errorByVerifyingRefreshToken] = verifyJWTToken(request.cookies[STRING_CONST.AUTH_REFRESH_TOKEN_KEY], process.env.CODE_HUB_REFRESH_SECRET);
    if (errorByVerifyingRefreshToken) {
        return next(errorByVerifyingRefreshToken);
    }
    if (!refreshToken) {
        throw new HandledAPIError(`JWT Refresh token "${refreshToken}" is not valid!`, "You need to sign up or sign in first!", NUMBER_CONST.HTTP_UNAUTHORIZED);
    }
    else {
        const [account, errorByGettintAccountById] = await getAccountById(refreshToken._id, { name: true, avatar: true });
        if (errorByGettintAccountById) {
            return next(errorByGettintAccountById);
        }
        const [newAccessToken, errorByCreatingAccesToken] = createJWTAccessToken({ _id: account._id });
        if (errorByCreatingAccesToken) {
            return next(errorByCreatingAccesToken.message);
        }
        response.status(200).send({ account, accessToken: newAccessToken });
    }
}
;
