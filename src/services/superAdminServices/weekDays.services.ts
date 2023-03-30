import { ApiError } from "@/utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class WeekDaysServices {
  async create(data: { name: string }) {
    const candidate = await prisma.weekDays.findFirst({
      where: {
        name: {
          equals: data.name,
          mode: "insensitive",
        },
      },
    });
    if (candidate) {
      throw ApiError.ClientError("Такой день недели уже существует");
    }
    const newWeekDay = await prisma.weekDays.create({
      data: {
        ...data,
      },
    });
    return newWeekDay;
  }

  async getList() {
    const weekDays = await prisma.weekDays.findMany();
    return weekDays;
  }

  async details(weekDayId: number) {
    const weekDay = await prisma.weekDays.findFirst({
      where: {
        id: weekDayId,
      },
    });
    return weekDay;
  }

  async edit(weekDayId: number, data: { name: string }) {
    const candidate = await prisma.weekDays.findFirst({
      where: {
        id: {
          not: weekDayId,
        },
        name: {
          equals: data.name,
          mode: "insensitive",
        },
      },
    });

    if (candidate) {
      throw ApiError.ClientError(
        "День недели с таким названием уже существует"
      );
    }
    const updated = await prisma.weekDays.updateMany({
      where: {
        id: weekDayId,
      },
      data: {
        ...data,
      },
    });
    if (updated.count > 0) {
      return { message: "Вы успешно обновили данные дня недели" };
    }
    throw ApiError.ClientError("Не удалось обновить данные дня недели");
  }

  async delete(weekDayId: number) {
    const response = await prisma.weekDays.deleteMany({
      where: {
        id: weekDayId,
      },
    });
    if (response.count > 0) {
      return { message: "Вы успешно удалили день недели" };
    }
    throw ApiError.ClientError("Не удалось удалить день недели");
  }
}

export default new WeekDaysServices();
