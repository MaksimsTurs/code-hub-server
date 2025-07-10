import logger from "../utils/logger/logger.util.js";
export default function logIncomingRequestData(request, _response, next) {
    logger.info(`Request on path "${request.url}" from "${request.headers.referer}".`);
    logger.info("Request params:", request.params);
    logger.info("Request body:", request.body);
    next();
}
;
