import { NextFunction, Request, Response } from "express";

class ManagerController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (err) {
      next(err);
    }
  }
}

export default new ManagerController();
