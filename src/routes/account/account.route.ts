import type { Multer } from "multer";

import multer from "multer";

import logIncomingRequestData from "../../middlewares/log-incoming-request-data.middleware.js";
import processCatchedError from "../../middlewares/process-catched-error.middleware.js";
import validateSignUpData from "../../middlewares/validate-sign-up-data.middleware.js";
import validateSignInData from "../../middlewares/validate-sign-in-data.middleware.js";
import validateNewAccountData from "../../middlewares/validate-new-account-data.middleware.js";
import authenticate from "../../middlewares/authenticate.middleware.js";

import signUp from "./sign-up.route.js";
import signIn from "./sign-in.route.js";
import signOut from "./sign-out.route.js";
import auth from "./auth.route.js";
import deleteAccount from "./delete-account.route.js";
import refreshAccessToken from "./refresh-access-token.route.js";
import getAccountById from "./get-account-by-id.route.js";
import changeAccountData from "./change-account-data.route.js";

const multipartParser: Multer = multer();

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
	signOut: [
		logIncomingRequestData,
		signOut,
		processCatchedError
	],
	auth: [
		logIncomingRequestData,
		auth,
		processCatchedError
	],
	changeAccountData: [
		multipartParser.fields([{ name: "name" }, { name: "avatar" }]),
		logIncomingRequestData,
		authenticate,
		validateNewAccountData,
		changeAccountData,
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
	],
	delete: [
		logIncomingRequestData,
		authenticate,
		deleteAccount,
		processCatchedError
	]
} as const;