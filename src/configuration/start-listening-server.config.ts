import { logger } from "../index.js";

import CONFIG_CONST from "@root/CONFIG.const.js";

export default function startListeningServer(): void {
	logger.in("dev", "prod").info(CONFIG_CONST.IS_DEV ? `Start Listening port ${CONFIG_CONST.PORT}.` : "Start Listening server.");
}