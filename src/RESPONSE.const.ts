export default {
	//Client errors
  400: (message?: string) => ({ code: 400, message: message || 'Bad Request!' }),
  401: (message?: string) => ({ code: 401, message: message || 'Unauthorized!' }),
  403: (message?: string) => ({ code: 403, message: message || 'Forbidden!' }),
  404: (message?: string) => ({ code: 404, message: message || 'Not found!' }),
  408: (message?: string) => ({ code: 408, message: message || 'Request timeout!' }),
  409: (message?: string) => ({ code: 409, message: message || 'Conflict!' }),
	422: (message?: string) => ({ code: 422, message: message || "Validation failure!" }),
  429: (message?: string) => ({ code: 429, message: message || 'Too many requests!' }),
  //Server errors
  500: (message?: string) => ({ code: 500, message: message || 'Internal server error!' }),
  503: (message?: string) => ({ code: 503, message: message || 'Service unavailable!' })
} as const;