import {Request, Response} from "express";

import {AuthResponse, RegisterResponse} from "../controllers/auth/models";
import {AuthRepository} from "../repositories/auth";
export  class AuthService {

  public async authenticate(req: Request, res: Response): AuthResponse {
    const response = await new AuthRepository().authenticate(req, res);
    return response;
  }
  public async register(req: Request, res: Response): RegisterResponse {
    const response = await new AuthRepository().register(req, res);
    return response;
  }
}
