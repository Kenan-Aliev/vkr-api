import { Roles } from "@prisma/client";
import jwt from "jsonwebtoken";
import { JwtPayload } from "@/interfaces";
import { ApiError } from "./ApiError";

export class Token {
  static encrypt(id: number, role: Roles) {
    return jwt.sign({ id, role }, process.env.JWT_SECRET ?? "secretKey");
  }
  static verify(token: string) {
    let data: JwtPayload = {} as JwtPayload;
    jwt.verify(token, process.env.JWT_SECRET ?? "secretKey", (err, decoded) => {
      if (err) {
        throw ApiError.ValidationError(err.message);
      }
      data = decoded as JwtPayload;
    });
    return data;
  }
}
