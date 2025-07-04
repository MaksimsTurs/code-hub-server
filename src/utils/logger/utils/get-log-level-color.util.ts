import chalk from "chalk";

import { ELogLevel } from "../logger.util.type.js";

export default function getLogLevelColor(logLevel: ELogLevel, timeText: string): string {
  switch(logLevel) {
    case 'ERROR':
      return `${chalk.redBright(timeText)}`;
    case 'INFO':
      return `${chalk.blueBright(timeText)}`;
    default: 
      return timeText;
  }
};