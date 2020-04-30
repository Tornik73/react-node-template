import {UserLogin, UserTokenImg} from "../../modules/unauthorized/models/login";
import {AUTH_ACTIONS} from "../models/actions";

const loginRequest = (userLogin: UserLogin) => ({
    type: AUTH_ACTIONS.LOGIN_AUTH_REQUEST,
    data: userLogin,
});

const logout = () => ({
    type: AUTH_ACTIONS.LOGOUT,
});

const loginFailed = (ErrorFromSaga: string) => ({
    type: AUTH_ACTIONS.LOGIN_AUTH_FAILED,
    error: ErrorFromSaga,
});

const loginSuccess = (userTokenImg: UserTokenImg) => ({
    type: AUTH_ACTIONS.LOGIN_SUCCESS,
    data: userTokenImg,
});
export {
    loginRequest,
    logout,
    loginFailed,
    loginSuccess,
}
