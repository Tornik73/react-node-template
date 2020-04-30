import Axios, {AxiosResponse} from "axios";
import {ResponseModel} from "../models";
import {ToastService} from "../services";

export const AxiosInterceptor = {
    init: () => {

        Axios.interceptors.response.use( (response:  AxiosResponse<ResponseModel<any>>): any =>
        {
            if(response.data) {
                const RESPONSE: ResponseModel<any> = response.data;
                return RESPONSE;
            }
        },
        (error: any) => {
            debugger
            const ERROR: string = error?.response?.data?.message;
            if(ERROR) {
                ToastService.showRedMessage(ERROR);
                return error.response.data;
            }
            ToastService.showRedMessage('Unknown error occurred!');
            return Promise.reject('Unknown error occurred!');
        });
        Axios.interceptors.request.use(function (config) {
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
    }
}

