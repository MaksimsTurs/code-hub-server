import { connect } from "mongoose";
import { logger } from "../../index.js";
import CONFIG_CONST from "../../CONFIG.const.js";
export default async function connectToMongoDb() {
    logger.in("dev", "prod").info(`Connecting to MongoDB, to "${CONFIG_CONST.MODE}" database.`);
    connect(CONFIG_CONST.MONGODB_URI);
}
;
