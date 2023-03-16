import { NextFunction, Request, Response } from "express";
import { superadminServices } from "../services";
import { StatusCode } from "../enums";

class SuperadminControllers {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const response = await superadminServices.create(data);
      return res.status(StatusCode.Created).json(response);
    } catch (err) {
      next(err);
    }
  }
}

export default new SuperadminControllers();
