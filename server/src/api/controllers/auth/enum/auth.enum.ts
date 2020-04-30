export enum AuthEnum {
  USER_NOT_FOUND = 'User not found',
  NOT_AUTHORIZED = 'Not authorized',
  INCORRECT_PASSWORD = 'Incorrect password',
  USER_AUTHORIZED = 'User successfully authorized',
  UNKNOWN_SERVER_ERROR = 'Unknown server error',
  USER_SUCCESSFULLY_REGISTERED = 'User Successfully registered',
  USER_ALREADY_EXIST = 'User already exist',
  INCORRECT_EMAIL = 'Please enter correct email',
}
export enum AuthCodesEnum {
  SUCCESS = 200,
  NOT_AUTHORIZED = 401,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  ALREADY_EXIST = 409,
  INTERNAL_SERVER_ERROR = 500
}
