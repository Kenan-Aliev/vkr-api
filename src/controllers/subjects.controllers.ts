import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { StatusCode } from "../enums";
import { subjectsServices } from "../services";
import { ApiError } from "../utils";

class SubjectsController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        throw ApiError.ValidationError(validationErrors.array()[0].msg);
      }
      const data = req.body;
      const response = await subjectsServices.create(data);
      return res.status(StatusCode.Created).json(response);
    } catch (err) {
      next(err);
    }
  }

  async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const subjects = await subjectsServices.getList();
      return res.json(subjects);
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: subjectId } = req.params;
      const subject = await subjectsServices.getById(Number(subjectId));
      return res.json(subject);
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
      const { id: subjectId } = req.params;
      const data = req.body;
      const response = await subjectsServices.edit(Number(subjectId), data);
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: subjectId } = req.params;
      const response = await subjectsServices.delete(Number(subjectId));
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }
}

export default new SubjectsController();
