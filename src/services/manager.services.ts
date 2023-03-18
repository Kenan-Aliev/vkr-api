import { EditManager, Manager } from "../interfaces";
import { PrismaClient, Roles } from "@prisma/client";
import { ApiError } from "../utils";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

class ManagerServices {
  async create(data: Manager) {
    const candidate = await prisma.users.findFirst({
      where: {
        phone: data.phone,
      },
    });
    if (candidate) {
      throw ApiError.ClientError(
        "Пользователь с таким номером телефона уже существует"
      );
    }
    const hashedPass = await bcrypt.hash(data.password, 8);
    const newUser = await prisma.users.create({
      data: {
        phone: data.phone,
        role: Roles.MANAGER,
        branchId: data.branchId,
        password: hashedPass,
      },
    });
    const newManager = await prisma.managers.create({
      data: {
        name: data.name,
        date_birth: data.date_birth,
        patronymic: data.patronymic,
        surname: data.surname,
        userId: newUser.id,
      },
    });
    return newManager;
  }

  async getList() {
    const managers = await prisma.users.findMany({
      where: {
        role: Roles.MANAGER,
      },
      select: {
        id: true,
        phone: true,
        role: true,
        branch: true,
        manager: {
          select: {
            name: true,
            surname: true,
            patronymic: true,
            date_birth: true,
          },
        },
      },
    });
    return managers;
  }

  async getById(managerId: number) {
    const manager = await prisma.users.findFirst({
      where: {
        id: managerId,
        role: Roles.MANAGER,
      },
      select: {
        id: true,
        phone: true,
        role: true,
        branch: true,
        manager: {
          select: {
            name: true,
            surname: true,
            patronymic: true,
            date_birth: true,
          },
        },
      },
    });
    return manager;
  }

  async edit(managerId: number, data: EditManager) {
    const updated = await prisma.managers.updateMany({
      where: {
        userId: managerId,
      },
      data: {
        ...data,
      },
    });
     if(updated.count > 0){
      return {message:"Вы успешно обновили данные менеджера"}
     }
  throw ApiError.ClientError("Не удалось обновить данные менеджера")
  }
}

export default new ManagerServices();
