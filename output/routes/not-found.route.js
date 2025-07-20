import NUMBER from "../NUMBER.const.js";
import RESPONSE from "../RESPONSE.const.js";
import { logger } from "../index.js";
export default function notFound(request, response) {
    logger.in("prod").info(`Log on unknown path from ${request.path}`);
    response.status(NUMBER.HTTP_NOT_FOUND).send(RESPONSE[404]());
}
;
