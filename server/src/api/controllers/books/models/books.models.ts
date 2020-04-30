import {Response} from "express";
import {ResponseModel} from "../../../models";
import {Book} from "../entity";

export type BooksResponse = Promise<Response<ResponseModel<Book[]>>>;
