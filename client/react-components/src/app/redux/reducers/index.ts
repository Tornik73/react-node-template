import authReducer from "./auth.reducer";
import { combineReducers } from "redux";
import loaderReducer from "./loader.reducer";
import booksReducer from "./books.reducer";
import chatReducer from "./chat.reducer";

export const reducers = combineReducers({
    authReducer,
    booksReducer,
    loaderReducer,
    chatReducer
});

export default reducers;
