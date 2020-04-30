
import { Request, Response } from "express";
import {AuthService} from "../../services/";
import {AuthResponse, RegisterResponse} from "./models";
export default class AuthController {
  constructor() {
  }

  public async authenticate(req: Request, res: Response): AuthResponse {
    const response = await new AuthService().authenticate(req, res);
    return response;
  };

  public async register (req: Request, res: Response): RegisterResponse {
    const response = await new AuthService().register(req, res);
    return response;
  };
}
