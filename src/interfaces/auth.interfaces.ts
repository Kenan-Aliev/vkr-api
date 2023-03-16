import { Role } from "@prisma/client";
import { Request } from "express";

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface JwtPayload {
  id: number;
  role: Role;
}

export interface AuthorizedRequest extends Request {
  user: JwtPayload;
}
