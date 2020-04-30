import Axios from "axios";
import {environment} from "../../../../../environments/environments.dev";
import {Book} from "../../entities/book";
import {ResponseModel} from "../../../../shared/models";


export const BooksRequestsService = {
    getAll: async (): Promise<ResponseModel<Book>> => {
        const response = await Axios.get(`${environment.apiUrl}/books/`) as any;
        return response;
    },
    postBook: async (data: Book): Promise<ResponseModel<Book>> => {
        const response = await Axios.post(`${environment.apiUrl}/books/`, data) as any;
        return response;
    },
};
