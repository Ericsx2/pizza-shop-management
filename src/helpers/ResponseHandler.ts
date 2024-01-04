export interface IHttpResponse {
  status: number;
  body?: any;
}

export class ResponseHandler {
  public static created(message: string, body?: any): IHttpResponse {
    return {
      status: 201,
      body: {
        message,
        ...body,
      },
    };
  }

  public static success(message: string, body?: any): IHttpResponse {
    return {
      status: 200,
      body: {
        message,
        ...body,
      },
    };
  }

  public static notFound(message: string, body?: any): IHttpResponse {
    return {
      status: 404,
      body: {
        message,
        ...body,
      },
    };
  }

  public static conflict(message: string, body?: any): IHttpResponse {
    return {
      status: 309,
      body: {
        message,
        ...body,
      },
    };
  }

  public static internalServerError(
    message: string,
    body?: any,
  ): IHttpResponse {
    return {
      status: 500,
      body: {
        message,
        ...body,
      },
    };
  }
}
