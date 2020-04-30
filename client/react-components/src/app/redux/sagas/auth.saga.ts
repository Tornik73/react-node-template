import {ToastService} from "../../shared/services";
import { takeEvery, all, fork, call, put } from "@redux-saga/core/effects";
import {AuthService} from "../../modules/unauthorized/services";
import { UserTokenImg} from "../../modules/unauthorized/models/login";
import {loginFailed, loginSuccess} from "../actions";
import {AUTH_ACTIONS, AuthActionTypes} from "../models/actions";
import {hideLoader} from "../actions/loader.actions";
import {ResponseModel} from "../../shared/models";
function* handleAuthRequest(action: AuthActionTypes) {

    try {
        debugger
        if(action.type === AUTH_ACTIONS.LOGIN_AUTH_REQUEST) {
            const RESPONSE: ResponseModel<UserTokenImg> = yield call(AuthService.login, action.data);
            if (RESPONSE.success) {
                yield put(loginSuccess(RESPONSE.data));
                ToastService.showGreenMessage(RESPONSE.message);
            }
            if(!RESPONSE.success) {
                yield put(loginFailed(RESPONSE.message));
            }
        }
        yield put(hideLoader());
    } catch(err) {
        yield put(loginFailed(err));
    }
}

function* watchLoginRequest() {
    yield takeEvery(AUTH_ACTIONS.LOGIN_AUTH_REQUEST, handleAuthRequest);
}

function* LoginSaga() {
    yield all([fork(watchLoginRequest)])
}

export default LoginSaga;
