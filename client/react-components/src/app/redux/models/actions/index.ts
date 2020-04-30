import * as AuthActions from "../../actions/auth.actions";
import * as BooksActions from "../../actions/book.actions";
import * as ChatActions from "../../actions/chat.actions";

/*
    Action type generator

     1. Create file {actionsName}.constants.ts
     2. Create file {actionsName}.actions.ts in ../../actions/
     3. Import all actions to ReturnType<InferValueTypes<typeof {ActionsName}>>;

     Ex. result type
     type AuthActionTypes = { type: "LOGIN_AUTH_REQUEST"; data: UserLogin; } | { type: "LOGOUT"; }
 */

type InferValueTypes<T> = T extends { [key: string]: infer U }
    ? U
    : never;

export type AuthActionTypes = ReturnType<InferValueTypes<typeof AuthActions>>;
export type BooksActionTypes = ReturnType<InferValueTypes<typeof BooksActions>>;
export type ChatActionTypes = ReturnType<InferValueTypes<typeof ChatActions>>;

export * from './auth-actions.models';
export * from './book-actions.constants';
export * from './chats-actions.constants';
