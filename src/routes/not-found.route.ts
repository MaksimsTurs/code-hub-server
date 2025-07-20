import type { Request, Response } from "express";

import NUMBER from "../NUMBER.const.js";
import RESPONSE from "../RESPONSE.const.js";

import { logger } from "../index.js";

export default function notFound(request: Request, response: Response): void {
	// TODO: Make something with this.
	logger.in("prod").info(`Log on unknown path from ${request.path}`);

	response.status(NUMBER.HTTP_NOT_FOUND).send(RESPONSE[404]());
};