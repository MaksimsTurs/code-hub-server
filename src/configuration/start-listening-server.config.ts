import logger from "../utils/logger/logger.util.js";

export default function startListeningServer(): void {
  logger.info(`Start Listening port ${process.env.SERVER_DEV_PORT}.`);
}