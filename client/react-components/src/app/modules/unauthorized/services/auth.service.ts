import Axios from "axios";
import {environment} from "../../../../environments/environments.dev";
import {UserLogin, UserTokenImg} from "../models/login";

export const AuthService = {
    login: async (userLogin: UserLogin): Promise<UserTokenImg> => {
        // userLogin = {
        //     "email": "egor2@gmail.com",
        //     "password": "12345678"
        // }
        const response = await Axios.post(`${environment.apiUrl}/authenticate/`, userLogin) as UserTokenImg;
        return response;
    },
};
