import {check} from "express-validator";
import {AuthEnum} from "../enum";

export const EXPRESS_VALIDATION_AUTH_REGISTER = [
  check('email' , AuthEnum.INCORRECT_EMAIL).isEmail(),
  check('password', AuthEnum.INCORRECT_PASSWORD).not().isEmpty(),
];
