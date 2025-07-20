import { ELogLevels } from "./Logger.util.type.js";
import getColorizedLogTime from "./utils/get-colorized-log-time.util.js";
class Logger {
    mode = null;
    modes = new Set();
    constructor(mode) {
        this.mode = mode;
    }
    in(...modes) {
        if (this.modes.size) {
            throw new Error("Logger.in function was called!");
        }
        let index = 0;
        const length = modes.length;
        while (index < length) {
            this.modes.add(modes[index]);
            index++;
        }
        return this;
    }
    info(text, ...data) {
        if (this.modes.has(this.mode)) {
            console.info(`${getColorizedLogTime(ELogLevels.INFO)} - ${text}`, ...data);
        }
        this.modes.clear();
    }
    warn(text, ...data) {
        if (this.modes.has(this.mode)) {
            console.info(`${getColorizedLogTime(ELogLevels.WARN)} - ${text}`, ...data);
        }
        this.modes.clear();
    }
    error(error, ...data) {
        if (this.modes.has(this.mode)) {
            const logTimText = getColorizedLogTime(ELogLevels.ERROR);
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
        this.modes.clear();
    }
}
;
export default Logger;
