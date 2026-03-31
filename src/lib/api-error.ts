export function createApiError(message: string, statusCode: number = 500) {
  return {
    status: statusCode,
    payload: {
      error: message,
      success: false,
      timestamp: new Date().toISOString()
    }
  };
}

export function createApiSuccess(data: any, statusCode: number = 200) {
  return {
    status: statusCode,
    payload: {
      data,
      success: true,
      timestamp: new Date().toISOString()
    }
  };
}

export class ApiError extends Error {
  constructor(
    public statusCode: number = 500,
    message: string = "Internal Server Error"
  ) {
    super(message);
    this.name = "ApiError";
  }
}
