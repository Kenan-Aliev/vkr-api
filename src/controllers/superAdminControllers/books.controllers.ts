import { NextFunction, Request, Response } from "express";
import { booksServices } from "@/services";
import { validationResult } from "express-validator";
import { ApiError } from "@/utils";
import { StatusCode } from "@/enums";

class BooksController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        throw ApiError.ValidationError(validationErrors.array()[0].msg);
      }
      const data = req.body;
      const response = await booksServices.create(data);
      return res.status(StatusCode.Created).json(response);
    } catch (err) {
      next(err);
    }
  }
}

export default new BooksController();
