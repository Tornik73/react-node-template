

import { takeEvery, all, fork, call, put } from "@redux-saga/core/effects";
import {getAllBooksSuccess, loginFailed, postBookSuccess, showLoader} from "../actions";
import {hideLoader} from "../actions/loader.actions";
import {BOOKS_ACTIONS} from "../models/actions/book-actions.constants";
import {BooksActionTypes} from "../models/actions";
import {BooksRequestsService} from "../../modules/authorized/services/books";
import {ResponseModel} from "../../shared/models";
import {Book} from "../../modules/authorized/entities/book";
function* handleBooksRequest(action: BooksActionTypes) {

    try {
        yield put(showLoader());
        if(action.type === BOOKS_ACTIONS.GET_ALL_BOOKS) {

            const RESPONSE: ResponseModel<Book> = yield call(BooksRequestsService.getAll);
            yield put(getAllBooksSuccess(RESPONSE.data));
        }
        if(action.type === BOOKS_ACTIONS.POST_BOOK_REQUEST) {
            const RESPONSE: ResponseModel<Book> = yield call(BooksRequestsService.postBook, action.data);
            yield put(postBookSuccess(RESPONSE.data));

        }
        yield put(hideLoader());
    } catch(err) {
        yield put(loginFailed(err));
    }
}

function* watchBooksRequest() {
    yield takeEvery(BOOKS_ACTIONS.GET_ALL_BOOKS, handleBooksRequest);
    yield takeEvery(BOOKS_ACTIONS.POST_BOOK_REQUEST, handleBooksRequest);
}

function* BookSaga() {
    yield all([fork(watchBooksRequest)])
}

export default BookSaga;
