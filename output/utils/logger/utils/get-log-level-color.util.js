import chalk from "chalk";
export default function getLogLevelColor(logLevel, timeText) {
    switch (logLevel) {
        case 'ERROR':
            return `${chalk.redBright(timeText)}`;
        case 'INFO':
            return `${chalk.blueBright(timeText)}`;
        default:
            return timeText;
    }
}
;
