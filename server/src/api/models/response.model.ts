export class ResponseModel<T> {
  public success: boolean;
  public message: string;
  public data: T;
}

export class ResponseValidation<T> implements Validation{
  public success: boolean;
  public message: string;
  public data: T;
  public validationErrors: string[];
}

interface Validation {
  validationErrors: string[],
}
