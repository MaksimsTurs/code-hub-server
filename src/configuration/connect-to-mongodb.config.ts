import { connect } from "mongoose";

import logger from "../utils/logger/logger.util.js";

export default async function connectToMongoDb(): Promise<void> {
	logger.info(`Connecting to MongoDB, current mode "${process.env.CODE_HUB_MODE}".`);
	
	connect(process.env.CODE_HUB_MODE === "dev" ? process.env.MONGODB_DEV_URI! : process.env.MONGODB_PROD_URI!);
};