import multer from "multer";
import logIncomingRequestData from "../../middlewares/log-incoming-request-data.middleware.js";
import validateSignUpData from "../../middlewares/validate-sign-up-data.middleware.js";
import validateSignInData from "../../middlewares/validate-sign-in-data.middleware.js";
import processCatchedError from "../../middlewares/process-catched-error.middleware.js";
import signUp from "./sign-up.route.js";
import signIn from "./sign-in.route.js";
import authorization from "./authorization.route.js";
import refreshAccessToken from "./refresh-access-token.route.js";
import getAccountById from "./get-account-by-id.route.js";
const multipartParser = multer();
export default {
    signUp: [
        multipartParser.fields([{ name: "avatar" }, { name: "name" }, { name: "email" }, { name: "password" }]),
        logIncomingRequestData,
        validateSignUpData,
        signUp,
        processCatchedError
    ],
    signIn: [
        multipartParser.fields([{ name: "name" }, { name: "email" }, { name: "password" }]),
        logIncomingRequestData,
        validateSignInData,
        signIn,
        processCatchedError
    ],
    authorization: [
        logIncomingRequestData,
        authorization,
        processCatchedError
    ],
    createAccessToken: [
        logIncomingRequestData,
        refreshAccessToken,
        processCatchedError
    ],
    getAccountById: [
        logIncomingRequestData,
        getAccountById,
        processCatchedError
    ]
};
