import { ApiError } from "@/utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class AdSourcesServices {
  async create(data: { name: string }) {
    const candidate = await prisma.adSources.findFirst({
      where: {
        name: {
          equals: data.name,
          mode: "insensitive",
        },
      },
    });
    if (candidate) {
      throw ApiError.ClientError("Такой источник рекламы уже существует");
    }
    const newAdSource = await prisma.adSources.create({
      data: {
        ...data,
      },
    });
    return newAdSource;
  }

  async list() {
    const adSources = await prisma.adSources.findMany();
    return adSources;
  }

  async details(adSourceId: number) {
    const adSource = await prisma.adSources.findFirst({
      where: {
        id: adSourceId,
      },
    });
    return adSource;
  }

  async edit(adSourceId: number, data: { name: string }) {
    const candidate = await prisma.adSources.findFirst({
      where: {
        id: {
          not: adSourceId,
        },
        name: {
          equals: data.name,
          mode: "insensitive",
        },
      },
    });
    if (candidate) {
      throw ApiError.ClientError(
        "Источник рекламы с таким названием уже существует"
      );
    }

    const response = await prisma.adSources.updateMany({
      where: {
        id: adSourceId,
      },
      data: {
        ...data,
      },
    });
    if (response.count > 0) {
      return { message: "Вы успешно обновили данные источника рекламы" };
    }
    throw ApiError.ClientError("Не удалось обновить данные источника рекламы");
  }

  async delete(adSourceId: number) {
    const response = await prisma.adSources.deleteMany({
      where: {
        id: adSourceId,
      },
    });
    if (response.count > 0) {
      return { message: "Вы успешно удалили источник рекламы" };
    }
    throw ApiError.ClientError("Не удалось удалить источник рекламы");
  }
}

export default new AdSourcesServices();
