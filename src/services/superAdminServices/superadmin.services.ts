import { CreateSuperadmin } from "@/interfaces";
import { PrismaClient, Roles } from "@prisma/client";

const prisma = new PrismaClient();

class SuperadminServices {
  async create(data: CreateSuperadmin) {
    const newUser = await prisma.users.create({
      data: {
        phone: data.phone,
        password: data.password,
        role: Roles.SUPERADMIN,
      },
    });
    await prisma.superadmins.create({
      data: {
        name: data.name,
        userId: newUser.id,
      },
    });
    return { message: "Вы успешно создали суперадмина" };
  }
}

export default new SuperadminServices();
