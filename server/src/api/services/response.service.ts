import { Response} from "express";
import {ResponseModel, ResponseValidation} from "../models/";
import {AuthCodesEnum} from "../controllers/auth/enum";
import {Result, ValidationError} from "express-validator";
import {ResponseEnum} from "./enum";
import {CodesEnum} from "../enums";

export class ResponseService {

  private readonly RESPONSE_WITH_ERROR = false;
  private readonly RESPONSE_WITH_SUCCESS = true;
  public errorResponse<T>(res: Response<ResponseModel<null>>, code: number, message: string): Response<ResponseModel<null>> {
    const errorResponse: ResponseModel<null> = {
        success: this.RESPONSE_WITH_ERROR,
        data: null,
        message: message
    }
    return res.status(code).send(errorResponse);
  }

  public notFound<T>(res: Response<ResponseModel<null>>, message: string): Response<ResponseModel<null>> {
    const errorResponse: ResponseModel<null> = {
      success: this.RESPONSE_WITH_ERROR,
      data: null,
      message: message
    }
    return res.status(CodesEnum.NOT_FOUND).send(errorResponse);
  }

  public badRequest<T>(res: Response<ResponseModel<null>>, message: string): Response<ResponseModel<null>> {
    const errorResponse: ResponseModel<null> = {
      success: this.RESPONSE_WITH_ERROR,
      data: null,
      message: message
    }
    return res.status(CodesEnum.BAD_REQUEST).send(errorResponse);
  }

  public successResponse<T>(res: Response<ResponseModel<T>>, data: T, code: number, message: string = null): Response<ResponseModel<T>> {
    const successResponse: ResponseModel<T> = {
      success: this.RESPONSE_WITH_SUCCESS,
      data: data,
      message: message
    }
    return res.status(code).send(successResponse);
  }

  public validationError<T>(err: Result<ValidationError>, code: number, res: Response<ResponseModel<T>>): Response<ResponseModel<T>> {
    const ERRORS: string[] = err.array().map(item => item.msg);
    const validationError: ResponseValidation<T> = {
      success: this.RESPONSE_WITH_ERROR,
      data: null,
      message: ResponseEnum.VALIDATION_IS_INCORRECT,
      validationErrors: ERRORS,
    }
    return res.status(code).send(validationError);
  }
}
