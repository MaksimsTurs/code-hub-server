import { logger } from "../index.js";
export default function logIncomingRequestData(request, _response, next) {
    logger.in("prod", "dev").info(`Request on path "${request.url}" from "${request.headers.referer}".`);
    logger.in("prod", "dev").info("Request params:", request.params);
    logger.in("prod", "dev").info("Request body:", request.body);
    return next();
}
;
