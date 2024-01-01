export interface IHttpResponse {
  status: number;
  body?: any;
  message: string;
}

export class ResponseHandler {
  public static created(message: string, body?: any): IHttpResponse {
    return {
      status: 201,
      body,
      message,
    };
  }

  public static success(message: string, body?: any): IHttpResponse {
    return {
      status: 200,
      body,
      message,
    };
  }

  public static conflict(message: string, body?: any): IHttpResponse {
    return {
      status: 309,
      body,
      message,
    };
  }

  public static internalServerError(
    message: string,
    body?: any,
  ): IHttpResponse {
    return {
      status: 500,
      body,
      message,
    };
  }
}
