import { Request, Response } from "express";
import { Book, books } from "./book.model";
import { bookService } from "../../services/book.service";
import {BooksResponse} from "./models";
import {ResponseService} from "../../services";
import {BookCodesEnum, BookEnum} from "./enum";

export default class BookController {
  private readonly responseService: ResponseService = new ResponseService();
  public findAll = async (req: Request, res: Response): BooksResponse => {

    try {
      const ALL_BOOKS = await books.findAll({ attributes: ['id', 'title', 'price', 'img', 'description']});

      if (!ALL_BOOKS) {
        const errorResponse = this.responseService.errorResponse(res, BookCodesEnum.NOT_FOUND, BookEnum.BOOK_NOT_FOUND);
        return errorResponse;
      }
      const successResponse = this.responseService.successResponse(res, ALL_BOOKS, BookCodesEnum.SUCCESS);
      return successResponse;
    } catch (err) {
      const errorResponse = this.responseService.errorResponse(res, BookCodesEnum.INTERNAL_SERVER_ERROR, err.toString());
      return errorResponse;
    }
  };

  public addBook = async (req: Request, res: Response): Promise<any> => {
    try {
      var book: Book = req.body;
      await new bookService().addBook(book);
      let bookDB = await new bookService().getBookByTitle(book.title);
      res.status(200).send(bookDB);
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public findOne = async (req: Request, res: Response): Promise<any> => {
    try {
      const book = await books.findOne({ where: { id: req.params.id } });

      if (!book) {
        return res.status(404).send({
          success: false,
          message: 'Book not found',
          data: null
        });
      }
      res.status(200).send(book);
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public update = async (req: Request, res: Response): Promise<any> => {
    const { title, author, price, description, img } = req.body;
    try {
      const userUpdated = await books.findOne({ where: { id: req.params.id } });
      userUpdated.update(
        {
          title,
          author,
          price,
          description,
          img,
        },
        {
          where: {
            id: req.params.id
          }
        });
      if (!userUpdated) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
          data: null
        });
      }
      res.status(200).send({
        success: true,
        data: userUpdated
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public remove = async (req: Request, res: Response): Promise<any> => {
    try {
      const user = await books.findOne({ where: { id: req.params.id } });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
          data: null
        });
      }
      // try catch mb
      res.status(200).send({ success: true, message: 'User delete' });
      user.destroy();
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };
}
