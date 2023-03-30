import { ApiError } from "@/utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class TimeServices {
  async create(data: { name: string }) {
    const candidate = await prisma.time.findFirst({
      where: {
        name: {
          equals: data.name,
          mode: "insensitive",
        },
      },
    });
    if (candidate) {
      throw ApiError.ClientError("Такое время уже существует");
    }
    const newTime = await prisma.time.create({
      data: {
        ...data,
      },
    });
    return newTime;
  }

  async getList() {
    const times = await prisma.time.findMany();
    return times;
  }

  async details(timeId: number) {
    const time = await prisma.time.findFirst({
      where: {
        id: timeId,
      },
    });
    return time;
  }

  async edit(timeId: number, data: { name: string }) {
    const candidate = await prisma.time.findFirst({
      where: {
        id: {
          not: timeId,
        },
        name: {
          equals: data.name,
          mode: "insensitive",
        },
      },
    });

    if (candidate) {
      throw ApiError.ClientError("Такое время уже существует");
    }
    const updated = await prisma.time.updateMany({
      where: {
        id: timeId,
      },
      data: {
        ...data,
      },
    });
    if (updated.count > 0) {
      return { message: "Вы успешно обновили данные времени" };
    }
    throw ApiError.ClientError("Не удалось обновить данные времени");
  }

  async delete(timeId: number) {
    const response = await prisma.time.deleteMany({
      where: {
        id: timeId,
      },
    });
    if (response.count > 0) {
      return { message: "Вы успешно удалили время" };
    }
    throw ApiError.ClientError("Не удалось удалить время");
  }
}

export default new TimeServices();
