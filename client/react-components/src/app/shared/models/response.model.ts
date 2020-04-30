export interface ResponseModel<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ResponseValidation<T> extends Validation{
  success: boolean;
  message: string;
  data: T;
  validationErrors: string[];
}

interface Validation {
  validationErrors: string[],
}
