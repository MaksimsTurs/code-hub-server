export default {
    200: (message = "Ok", data) => ({ ...data, code: 200, message }),
    400: (message = "Bad Request!", data) => ({ ...data, code: 400, message }),
    401: (message = "Unauthorized!", data) => ({ ...data, code: 401, message }),
    403: (message = "Forbidden!", data) => ({ ...data, code: 403, message }),
    404: (message = "Not found!", data) => ({ ...data, code: 404, message }),
    408: (message = "Request timeout!", data) => ({ ...data, code: 408, message }),
    409: (message = "Conflict!", data) => ({ ...data, code: 409, message }),
    422: (message = "Validation failure!", data) => ({ ...data, code: 422, message }),
    429: (message = "Too many requests!", data) => ({ ...data, code: 429, message }),
    500: (message = "Internal server error!", data) => ({ ...data, code: 500, message }),
    503: (message = "Service unavailable!", data) => ({ ...data, code: 503, message })
};
