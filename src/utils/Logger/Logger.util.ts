import { ELogLevels } from "./Logger.util.type.js";

import getColorizedLogTime from "./utils/get-colorized-log-time.util.js";

class Logger<M extends string> {
	private mode: M | null = null;
	private modes: Set<M> = new Set();

	constructor(mode: M) {
		this.mode = mode;
	}

	in(...modes: M[]) {
		if(this.modes.size) {
			throw new Error("Logger.in function was called!");
		}

		let index: number = 0;

		const length: number = modes.length;

		while(index < length) {
			this.modes.add(modes[index]);
			index++;
		}

		return this;
	}

	info(text: string, ...data: any[]) {
		if(this.modes.has(this.mode!)) {
			console.info(`${getColorizedLogTime(ELogLevels.INFO)} - ${text}`, ...data);
		}
			
		this.modes.clear();
	}

	warn(text: string, ...data: any[]) {
		if(this.modes.has(this.mode!)) {
			console.info(`${getColorizedLogTime(ELogLevels.WARN)} - ${text}`, ...data);
		}
			
		this.modes.clear();
	}

	error(error: unknown, ...data: any[]) {
		if(this.modes.has(this.mode!)) {
			const logTimText: string = getColorizedLogTime(ELogLevels.ERROR);
			
			if(error instanceof Error) {
				console.error(`${logTimText} - ${error.message}`);
	
				if(data.length) {
					console.error(`${logTimText} -`, ...data);
				}
				
				console.error(`${logTimText} -\n`, error.stack?.replace(/.*Error.*/, "").trim());
			} else {
				console.error(`${logTimText} - ${error}`, ...data);
			}
		}

		this.modes.clear();
	}
};

export default Logger;