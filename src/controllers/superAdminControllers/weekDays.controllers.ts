import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCode } from "@/enums";
import { ApiError } from "@/utils";
import { weekDaysServices } from "@/services";

class WeekDaysControllers {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        throw ApiError.ValidationError(validationErrors.array()[0].msg);
      }
      const data = req.body;
      const response = await weekDaysServices.create(data);
      return res.status(StatusCode.Created).json(response);
    } catch (err) {
      next(err);
    }
  }

  async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await weekDaysServices.getList();
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async details(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: weekDayId } = req.params;
      const response = await weekDaysServices.details(Number(weekDayId));
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
      const { id: weekDayId } = req.params;
      const response = await weekDaysServices.edit(Number(weekDayId), data);
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: weekDayId } = req.params;
      const response = await weekDaysServices.delete(Number(weekDayId));
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }
}

export default new WeekDaysControllers();
