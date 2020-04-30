import {Response} from "express";
import {ResponseModel} from "../../../models";
import {UserTokenImg} from "../../users/user.model"; // TODO:REFACTOR

export type AuthResponse = Promise<Response<ResponseModel<null | UserTokenImg>>>;
export type RegisterResponse = Promise<Response<ResponseModel<null>>>;
