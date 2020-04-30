import {all, fork} from "@redux-saga/core/effects";
import AuthSaga from "./auth.saga";
import BookSaga from "./book.saga";
import ChatSaga from "./chat.saga";

export function* rootSaga() {
    yield all([
        fork(AuthSaga),
        fork(BookSaga),
        fork(ChatSaga),
    ])
}
