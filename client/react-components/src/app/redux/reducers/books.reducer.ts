import {BooksActionTypes} from "../models/actions";
import {BOOKS_ACTIONS} from "../models/actions/book-actions.constants";
import {Book} from "../../modules/authorized/entities/book";


const INIT_BOOK_STATE: {books: Book[]} = {
    books: [],
}


export default function booksReducer(state = INIT_BOOK_STATE, action: BooksActionTypes ) {
    switch (action.type) {
        case BOOKS_ACTIONS.GET_ALL_BOOKS_SUCCESS: {
            return {
                books: action.data
            }
        }
        default:
            return state;
    }

}
