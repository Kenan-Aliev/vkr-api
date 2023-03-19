import { NextFunction, Request, Response } from "express";
import { AuthorizedRequest } from "@/interfaces";
import { authServices } from "@/services";

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const response = await authServices.login(data);
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }

  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const request = req as AuthorizedRequest;
      const response = await authServices.getProfile(
        request.user.id,
        request.user.role
      );
      return res.json(response);
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();
