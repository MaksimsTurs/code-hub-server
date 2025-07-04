import type { Request, Response, NextFunction } from "express";

import logger from "@util/logger/logger.util.js";

export default function logIncomingRequestData(request: Request, _response: Response, next: NextFunction): void {
	logger.info(`Request on path "${request.url}" from "${request.headers.referer}".`);
	logger.info("Request params:", request.params);
	logger.info("Request body:", request.body);

	next();
};