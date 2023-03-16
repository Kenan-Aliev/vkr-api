import { LoginRequest } from "../interfaces";
import { PrismaClient, Role } from "@prisma/client";
import { ApiError, Token } from "../utils";
import bcrypt from "bcrypt";
import tokensServices from "./tokens.services";

const prisma = new PrismaClient();

class AuthServices {
  async login(data: LoginRequest) {
    const user = await prisma.user.findFirst({
      where: {
        phone: data.phone,
      },
    });
    if (!user) {
      throw ApiError.ClientError(
        "Пользователя с таким номером телефона не существует"
      );
    }
    const isPassValid = user.password === data.password;
    if (!isPassValid) {
      throw ApiError.ClientError("Неверный пароль");
    }
    const token = Token.encrypt(user.id, user.role);
    await tokensServices.create(user.id, token);
    return { token };
  }

  async getProfile(userId: number, userRole: Role) {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        id: true,
        phone: true,
        role: true,
        manager: userRole === "manager",
        student: userRole === "student",
        superadmin: userRole === "superadmin",
        teacher: userRole === "teacher",
      },
    });
    return user;
  }
}

export default new AuthServices();
