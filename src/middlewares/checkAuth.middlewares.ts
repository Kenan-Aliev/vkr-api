import { NextFunction, Request, Response } from "express";
import { AuthorizedRequest } from "../interfaces";
import { ApiError } from "../utils";
import { Token } from "../utils";
import { tokensServices } from "../services";

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const myRequest = req as AuthorizedRequest;
    const bearer = myRequest.headers.authorization;
    if (!bearer) {
      throw ApiError.UnAuthorizedError("Требуются заголовки для токена");
    }
    const token = bearer.split(" ")[1];
    const isTokenExists = await tokensServices.findToken(token);
    if (isTokenExists) {
      const userData = Token.verify(token);
      myRequest.user = userData;
      next();
    } else {
      throw ApiError.Forbidden(
        "Обновите ваш токен, вы отправили недействительный токен"
      );
    }
  } catch (err) {
    next(err);
  }
};
