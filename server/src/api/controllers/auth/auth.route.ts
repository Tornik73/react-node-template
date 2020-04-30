import { Router } from 'express';
import AuthController from './auth.controller';
import {EXPRESS_VALIDATION_AUTH_REGISTER} from "./validation";

const user: Router = Router();
const authController = new AuthController();

// Sign In
user.post(
  '/authenticate',
  authController.authenticate
);

// Register New User
user.post(
  '/register',
  EXPRESS_VALIDATION_AUTH_REGISTER,
  authController.register
);

export default user;
