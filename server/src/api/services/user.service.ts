import {UserTokenImg, UserTokenPayload} from "../controllers/users/user.model";
import {Request, Response} from "express";
import {ResponseModel} from "../models/";
import {ResponseService} from './response.service';

import {AuthRepository} from "../repositories/auth/auth.repository";
import {UserRepository} from "../repositories/user/users.repository";
export  class UserService {
  private readonly responseService: ResponseService = new ResponseService();


  public async findUserByEmail(email: string) {
    const response = await new UserRepository().findUserByEmail(email);
    return response;
  }
}
