import CONFIG from "../../config/config";
import conn from "../../config/db.connection";
import to from "await-to-js";
import * as Sequelize from "sequelize";
import sequelize from "../../config/db.connection";

import { Book, books } from "../controllers/books/book.model";

export class bookService {
    public async getBooks(page: number): Promise<any> {
        return await books.findAll({
            limit: 10,
            offset: page
        });
    }

    public async getBookByTitle(title: string) {
        var book = (await books.findOne({
            where: { title: title }
        })) as Book;
        if (book) return book;
    }

    public async addBook(book: Book) {
        await books.create(book);
    }
}
