import chalk from "chalk";
import { ELogLevels } from "../Logger.util.type.js";
import getLocaleTimeString from "./get-locale-time-string.util.js";
export default function getColorizedLogTime(logLevel) {
    const timeText = getLocaleTimeString();
    switch (logLevel) {
        case ELogLevels.ERROR:
            return chalk.redBright(`${ELogLevels.ERROR} ${timeText}`);
        case ELogLevels.INFO:
            return chalk.blueBright(`${ELogLevels.INFO} ${timeText}`);
        case ELogLevels.WARN:
            return chalk.yellowBright(`${ELogLevels.WARN} ${timeText}`);
        default:
            return `${ELogLevels.UNKNOWN} ${timeText}`;
    }
}
;
