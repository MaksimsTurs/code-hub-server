import { ELogLevel } from "./logger.util.type.js";
import getLogLevelColor from "./utils/get-log-level-color.util.js";
import getLocaleTimeString from "./utils/get-locale-time-string.util.js";
const logger = {
    info: function (text, ...data) {
        console.info(`${getLogLevelColor(ELogLevel.INFO, `${ELogLevel.INFO} ${getLocaleTimeString()}`)} - ${text}`, ...data);
    },
    error: function (error, ...data) {
        const logTimText = getLogLevelColor(ELogLevel.ERROR, `${ELogLevel.ERROR} ${getLocaleTimeString()}`);
        if (error instanceof Error) {
            console.error(`${logTimText} - ${error.message}`);
            if (data.length) {
                console.error(`${logTimText} -`, ...data);
            }
            console.error(`${logTimText} -\n`, error.stack?.replace(/.*Error.*/, "").trim());
        }
        else {
            console.error(`${logTimText} - ${error}`, ...data);
        }
    }
};
export default logger;
