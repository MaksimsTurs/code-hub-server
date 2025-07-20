export default {
	// Success 
	200: (message: string = "Ok",                     data?: any) => ({...data, code: 200, message }),
	// Client errors
  400: (message: string = "Bad Request!",           data?: any) => ({ ...data, code: 400, message }),
  401: (message: string = "Unauthorized!",          data?: any) => ({ ...data, code: 401, message }),
  403: (message: string = "Forbidden!",             data?: any) => ({ ...data, code: 403, message }),
  404: (message: string = "Not found!"   ,          data?: any) => ({ ...data, code: 404, message }),
  408: (message: string = "Request timeout!",       data?: any) => ({ ...data, code: 408, message }),
  409: (message: string = "Conflict!",              data?: any) => ({ ...data, code: 409, message }),
	422: (message: string = "Validation failure!",    data?: any) => ({ ...data, code: 422, message }),
  429: (message: string = "Too many requests!",     data?: any) => ({ ...data, code: 429, message }),
  // Server errors
  500: (message: string = "Internal server error!", data?: any) => ({ ...data, code: 500, message }),
  503: (message: string = "Service unavailable!",   data?: any) => ({ ...data, code: 503, message })
} as const;