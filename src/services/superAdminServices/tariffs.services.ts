import { Tariff } from "@/interfaces";
import { PrismaClient } from "@prisma/client";
import { ApiError } from "@/utils";

const prisma = new PrismaClient();

class TariffsServices {
  async create(data: Tariff) {
    const candidate = await prisma.tariffs.findFirst({
      where: {
        name: {
          equals: data.name,
          mode: "insensitive",
        },
      },
    });
    if (candidate) {
      throw ApiError.ClientError("Тариф с таким названием уже существует");
    }
    const newTariff = await prisma.tariffs.create({
      data: {
        ...data,
      },
    });

    return newTariff;
  }

  async getList() {
    const tariffs = await prisma.tariffs.findMany();
    return tariffs;
  }

  async details(tariffId: number) {
    const tariff = await prisma.tariffs.findFirst({
      where: {
        id: tariffId,
      },
    });
    return tariff;
  }

  async edit(tariffId: number, data: Tariff) {
    const candidate = await prisma.tariffs.findFirst({
      where: {
        id: {
          not: tariffId,
        },
        name: {
          equals: data.name,
          mode: "insensitive",
        },
      },
    });

    if (candidate) {
      throw ApiError.ClientError("Тариф с таким названием уже существует");
    }
    const updated = await prisma.tariffs.updateMany({
      where: {
        id: tariffId,
      },
      data: {
        ...data,
      },
    });
    if (updated.count > 0) {
      return { message: "Вы успешно обновили данные тарифа" };
    }
    throw ApiError.ClientError("Не удалось обновить данные тарифа");
  }

  async delete(tariffID: number) {
    const response = await prisma.tariffs.deleteMany({
      where: {
        id: tariffID,
      },
    });
    if (response.count > 0) {
      return { message: "Вы успешно удалили тариф" };
    }
    throw ApiError.ClientError("Не удалось удалить тариф");
  }
}

export default new TariffsServices();
