import {LocalStorageEnum} from "../../shared/enum/local-storage";
import {AuthReducerState} from "../models/reducers";
import {AUTH_ACTIONS, AuthActionTypes} from "../models/actions";
const JWT = require('jwt-decode');

const INIT_AUTH_STATE: AuthReducerState = {
    isUserAuthenticated: false,
    userState: {
        user_id: '',
        email: '',
        name: '',
        lastname: '',
        username: '',
        telephone: '',
        age: null,
        country: '',
        gender: '',
        isAdmin: false,
        img: '',
        token: '',
    },
}


export default function authReducer(state = INIT_AUTH_STATE, action: AuthActionTypes ) {
    switch (action.type) {
        case AUTH_ACTIONS.LOGIN_AUTH_REQUEST: {
            return {
                ...state,
            }
        }
        case AUTH_ACTIONS.LOGIN_SUCCESS: {

            const TOKEN = action.data.token;
            const IMG = action.data.img;
            localStorage.setItem(LocalStorageEnum.TOKEN, TOKEN);
            localStorage.setItem(LocalStorageEnum.USER_IMG, IMG);

            state.userState.token = TOKEN ? TOKEN : '';
            state.userState.img = IMG ? IMG : '';
            state.isUserAuthenticated = TOKEN ? true : false;
            return {
                ...state,
                isUserAuthenticated: true,
            }
        }
        case AUTH_ACTIONS.LOGOUT: {
            localStorage.removeItem(LocalStorageEnum.TOKEN);
            localStorage.removeItem(LocalStorageEnum.USER_IMG);
            return {
                ...state,
                isUserAuthenticated: false,
            }
        }
        case AUTH_ACTIONS.LOGIN_AUTH_FAILED: {
            return {
                ...state,
                isUserAuthenticated: false,
            }
        }
        default:
            const TOKEN = localStorage.getItem(LocalStorageEnum.TOKEN);
            const IMG = localStorage.getItem(LocalStorageEnum.USER_IMG);
            if(!TOKEN) {
                return state;
            }
            const USER = JWT(TOKEN).USER_TOKEN_PAYLOAD;
            state.userState = USER;
            state.userState.token = TOKEN;
            state.userState.img = IMG ? IMG : '';
            state.isUserAuthenticated = TOKEN ? true : false;
            return state;
    }

}
