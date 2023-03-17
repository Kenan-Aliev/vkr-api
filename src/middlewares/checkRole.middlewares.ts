import { Roles } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { AuthorizedRequest } from "../interfaces";
import { ApiError } from "../utils";

export const checkRoleMiddleware = (allowedRoles: Roles[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const request = req as AuthorizedRequest;
      if (allowedRoles.includes(request.user.role)) {
        next();
      } else {
        throw ApiError.Forbidden("Нет доступа");
      }
    } catch (err) {
      next(err);
    }
  };
};
