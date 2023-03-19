import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ApiError } from "@/utils";
import { tariffsServices } from "@/services";
import { StatusCode } from "@/enums";

class TariffsController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        throw ApiError.ValidationError(validationErrors.array()[0].msg);
      }
      const data = req.body;
      const response = await tariffsServices.create(data);
      return res.status(StatusCode.Created).json(response);
    } catch (err) {
      next(err);
    }
  }

  async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await tariffsServices.getList();
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async details(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: tariffId } = req.params;
      const response = await tariffsServices.details(Number(tariffId));
      return res.json(response);
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
      const data = req.body;
      const { id: tariffId } = req.params;
      const response = await tariffsServices.edit(Number(tariffId), data);
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: tariffId } = req.params;
      const response = await tariffsServices.delete(Number(tariffId));
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }
}

export default new TariffsController();
