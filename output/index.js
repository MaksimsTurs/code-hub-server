import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectToMongoDb from "./configuration/connect-to-mongodb.config.js";
import startListeningServer from "./configuration/start-listening-server.config.js";
import _404_ from "./routes/404.route.js";
import userRoute from "./routes/user/user.route.js";
import projectRoute from "./routes/project/project.route.js";
const app = express();
dotenv.config();
await connectToMongoDb();
app
    .use(cors({ credentials: true, origin: process.env.CODE_HUB_MODE === "dev" ? process.env.CODE_HUB_DEV_ORIGINS?.trim() : process.env.CODE_HUB_PROD_ORIGINS?.trim() }))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cookieParser())
    .listen(process.env.SERVER_DEV_PORT, startListeningServer);
app.get("/", (_request, response) => { response.status(200).send({ message: "Success!" }); });
app.post("/project/create", ...projectRoute.create);
app.get("/project/all", ...projectRoute.getAllProjects);
app.post("/user/sign-up", ...userRoute.signUp);
app.post("/user/sign-in", ...userRoute.signIn);
app.get("/user/authorization", ...userRoute.authorization);
app.get("/user/refresh-access-token", ...userRoute.createAccessToken);
app.get("/user/:userId", ...userRoute.getAccountById);
app.use(_404_);
export default app;
