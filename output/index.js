import CONFIG_CONST from "./CONFIG.const.js";
import OBJECT_CONST from "./OBJECT.const.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongodb from "./services/mongodb/mongodb.service.js";
import startListeningServer from "./configuration/start-listening-server.config.js";
import notFound from "./routes/not-found.route.js";
import accountRoute from "./routes/account/account.route.js";
import projectRoute from "./routes/project/project.route.js";
import Logger from "./utils/Logger/Logger.util.js";
export const logger = new Logger(CONFIG_CONST.MODE);
const app = express();
mongodb.connect();
app
    .use(cors(OBJECT_CONST.CORS))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cookieParser())
    .listen(CONFIG_CONST.PORT, startListeningServer);
app.post("/project/create", ...projectRoute.create);
app.get("/project/all", ...projectRoute.getAllProjects);
app.post("/account/change/:accountId", ...accountRoute.changeAccountData);
app.get("/account/auth", ...accountRoute.auth);
app.get("/account/sign-out", ...accountRoute.signOut);
app.get("/account/refresh-access-token", ...accountRoute.createAccessToken);
app.delete("/account/delete/:userId", ...accountRoute.delete);
app.post("/account/sign-up", ...accountRoute.signUp);
app.post("/account/sign-in", ...accountRoute.signIn);
app.get("/account/:userId", ...accountRoute.getAccountById);
app.use(notFound);
export default app;
