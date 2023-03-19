import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ApiError } from "@/utils";
import { StatusCode } from "@/enums";
import { adSourcesServices } from "@/services";

class AdSourcesControllers {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        throw ApiError.ValidationError(validationErrors.array()[0].msg);
      }
      const data = req.body;
      const response = await adSourcesServices.create(data);
      return res.status(StatusCode.Created).json(response);
    } catch (err) {
      next(err);
    }
  }

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await adSourcesServices.list();
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async details(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: adSourceId } = req.params;
      const response = await adSourcesServices.details(Number(adSourceId));
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
      const { id: adSourceId } = req.params;
      const response = await adSourcesServices.edit(Number(adSourceId), data);
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: adSourceId } = req.params;
      const response = await adSourcesServices.delete(Number(adSourceId));
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }
}

export default new AdSourcesControllers();
