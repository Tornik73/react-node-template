import {User, USERS_REPOSITORY, UserTokenImg, UserTokenPayload, UserLogin} from "../../controllers/users/user.model";
import {AuthCodesEnum, AuthEnum} from "../../controllers/auth/enum";
import * as bcrypt from "bcrypt";
import * as jwt from "jwt-then";
import config from "../../../config/config";
import {Request, Response} from "express";
import {ResponseService} from "../../services/response.service";
import {ResponseModel} from "../../models";
import {UserService} from "../../services/user.service";
import { check, validationResult } from 'express-validator';
import {AuthResponse} from "../../controllers/auth/models";
import { v4 as uuidv4 } from 'uuid';

export  class AuthRepository {
  private readonly responseService: ResponseService = new ResponseService();
  public async authenticate(req: Request, res: Response): AuthResponse {
    try {
      const USER_LOGIN: UserLogin = req.body;

       const user = (await USERS_REPOSITORY.findOne({
         where: { email: USER_LOGIN.email }
       })) as User;

      if (!user) {
        const errorResponse = this.responseService.errorResponse(res, AuthCodesEnum.NOT_FOUND, AuthEnum.USER_NOT_FOUND);
        return errorResponse;
      }

      const matchPasswords = await bcrypt.compare(USER_LOGIN.password, user.password);
      if (!matchPasswords) {
        const errorResponse = this.responseService.errorResponse(res, AuthCodesEnum.NOT_AUTHORIZED, AuthEnum.INCORRECT_PASSWORD);
        return errorResponse;
      }
      const USER_TOKEN_PAYLOAD = new UserTokenPayload(user);

      const TOKEN = await jwt.sign({ USER_TOKEN_PAYLOAD }, config.JWT_ENCRYPTION, {
          expiresIn: config.JWT_EXPIRATION
        }
      );

      const USER_TOKEN_IMG = new UserTokenImg(TOKEN, user.img);
      const successResponse = this.responseService.successResponse(res, USER_TOKEN_IMG, AuthCodesEnum.SUCCESS, AuthEnum.USER_AUTHORIZED);
      return successResponse;
    } catch (err) {
      const errorResponse = this.responseService.errorResponse(res, AuthCodesEnum.INTERNAL_SERVER_ERROR, AuthEnum.UNKNOWN_SERVER_ERROR);
      return errorResponse;
    }

  }

  public async register(req: Request, res: Response): Promise<Response<ResponseModel<null>>> {
    try {

      const errors = validationResult(req);

      if(!errors.isEmpty()) {
        return this.responseService.validationError(errors, AuthCodesEnum.BAD_REQUEST, res);
      }

      const userDB = await new UserService().findUserByEmail(req.body.email);

      if(userDB) {
        const errorResponse = this.responseService.errorResponse(res, AuthCodesEnum.ALREADY_EXIST, AuthEnum.USER_ALREADY_EXIST);
        return errorResponse;
      }
      const user: User = {
        user_id: uuidv4(),
        email: req.body.email,
        isAdmin: false,
        password: await bcrypt.hash(req.body.password, config.SALT_ROUNDS),
        img: req.body.img,
        telephone: req.body.telephone,
        age: req.body.age
      };

      await USERS_REPOSITORY.create(user);

      const successResponse = this.responseService.successResponse(res, null, AuthCodesEnum.SUCCESS, AuthEnum.USER_SUCCESSFULLY_REGISTERED);
      return successResponse;
    }
    catch (err) {
      const errorResponse = this.responseService.errorResponse(res, AuthCodesEnum.INTERNAL_SERVER_ERROR, err.toString());
      return errorResponse;
    }
  }
}
