import dotenv from "dotenv";
dotenv.config();
const isDev = (process.env.CODE_HUB_MODE?.trim() || "prod") === "dev";
export default {
    IS_DEV: isDev,
    MODE: (process.env.CODE_HUB_MODE.trim() || "dev"),
    ACCESS_SECRET: (process.env.CODE_HUB_ACCESS_SECRET.trim()),
    REFRESH_SECRET: (process.env.CODE_HUB_REFRESH_SECRET.trim()),
    PORT: (process.env.CODE_HUB_SERVER_DEV_PORT.trim()),
    ORIGINS: (isDev ? process.env.CODE_HUB_DEV_ORIGINS.trim() : process.env.CODE_HUB_PROD_ORIGINS.trim()),
    MONGODB_URI: (isDev ? process.env.MONGODB_DEV_URI.trim() : process.env.MONGODB_PROD_URI.trim())
};
