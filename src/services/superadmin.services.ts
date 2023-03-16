import { CreateSuperadmin } from "../interfaces";
import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

class SuperadminServices {
  async create(data: CreateSuperadmin) {
    const newUser = await prisma.user.create({
      data: {
        phone: data.phone,
        password: data.password,
        role: Role.superadmin,
      },
    });
    await prisma.superadmin.create({
      data: {
        name: data.name,
        userId: newUser.id,
      },
    });
    return { message: "Вы успешно создали суперадмина" };
  }
}

export default new SuperadminServices();
