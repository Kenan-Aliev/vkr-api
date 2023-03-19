import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ApiError } from "@/utils";
import { managerServices } from "@/services";
import { StatusCode } from "@/enums";

class ManagerController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        throw ApiError.ValidationError(validationErrors.array()[0].msg);
      }
      const data = req.body;
      const response = await managerServices.create(data);
      return res.status(StatusCode.Created).json(response);
    } catch (err) {
      next(err);
    }
  }

  async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const managers = await managerServices.getList();
      return res.json(managers);
    } catch (err) {
      next(err);
    }
  }

  async getByID(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: managerId } = req.params;
      const manager = await managerServices.getById(Number(managerId));
      return res.json(manager);
    } catch (err) {
      next(err);
    }
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        throw ApiError.ValidationError(validationErrors.array()[0].msg);
      }
      const { id: managerId } = req.params;
      const data = req.body;
      const response = await managerServices.edit(Number(managerId), data);
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }
}

export default new ManagerController();
