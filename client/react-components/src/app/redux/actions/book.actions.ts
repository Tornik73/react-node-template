import {BOOKS_ACTIONS} from "../models/actions/book-actions.constants";
import {Book} from "../../modules/authorized/entities/book";

const getAllBooksRequest = () => ({
    type: BOOKS_ACTIONS.GET_ALL_BOOKS,
});
const getAllBooksSuccess = (data: Book) => ({
    type: BOOKS_ACTIONS.GET_ALL_BOOKS_SUCCESS,
    data: data,
});
const postBookRequest = (data: Book) => ({
    type: BOOKS_ACTIONS.POST_BOOK_REQUEST,
    data: data,
});

const postBookSuccess = (data: Book) => ({
    type: BOOKS_ACTIONS.POST_BOOK_SUCCESS,
    data: data,
});
export {
    getAllBooksRequest,
    getAllBooksSuccess,
    postBookRequest,
    postBookSuccess
}
