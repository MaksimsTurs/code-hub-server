export default {
    400: (message = "Bad Request!", data) => ({ ...data, code: 400, message: message }),
    401: (message = "Unauthorized!", data) => ({ ...data, code: 401, message: message }),
    403: (message = "Forbidden!", data) => ({ ...data, code: 403, message: message }),
    404: (message = "Not found!", data) => ({ ...data, code: 404, message: message }),
    408: (message = "Request timeout!", data) => ({ ...data, code: 408, message: message }),
    409: (message = "Conflict!", data) => ({ ...data, code: 409, message: message }),
    422: (message = "Validation failure!", data) => ({ ...data, code: 422, message: message }),
    429: (message = "Too many requests!", data) => ({ ...data, code: 429, message: message }),
    500: (message = "Internal server error!", data) => ({ ...data, code: 500, message: message }),
    503: (message = "Service unavailable!", data) => ({ ...data, code: 503, message: message })
};
