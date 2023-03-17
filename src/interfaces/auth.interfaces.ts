import { Roles } from "@prisma/client";
import { Request } from "express";

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface JwtPayload {
  id: number;
  role: Roles;
}

export interface AuthorizedRequest extends Request {
  user: JwtPayload;
}
