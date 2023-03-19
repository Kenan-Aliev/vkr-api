import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCode } from "@/enums";
import { branchesServices } from "@/services";
import { ApiError } from "@/utils";

class BranchesController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        throw ApiError.ValidationError(validationErrors.array()[0].msg);
      }
      const data = req.body;
      const response = await branchesServices.create(data);
      return res.status(StatusCode.Created).json(response);
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
      const { id: branchId } = req.params;
      const response = await branchesServices.edit(Number(branchId), data);
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: branchId } = req.params;
      const response = await branchesServices.getById(Number(branchId));
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await branchesServices.getList();
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: branchId } = req.params;
      const response = await branchesServices.delete(Number(branchId));
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }
}

export default new BranchesController();
