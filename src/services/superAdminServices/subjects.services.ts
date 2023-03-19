import { Subject } from "@/interfaces";
import { PrismaClient } from "@prisma/client";
import { ApiError } from "@/utils";

const prisma = new PrismaClient();

class SubjectsServices {
  async create(data: Subject) {
    const candidate = await prisma.subjects.findFirst({
      where: {
        name: {
          equals: data.name,
          mode: "insensitive",
        },
      },
    });

    if (candidate) {
      throw ApiError.ClientError("Предмет с таким названием уже существует");
    }

    const newSubject = await prisma.subjects.create({
      data: {
        ...data,
      },
    });

    return newSubject;
  }

  async getList() {
    const subjects = await prisma.subjects.findMany();
    return subjects;
  }

  async getById(subjectId: number) {
    const subject = await prisma.subjects.findFirst({
      where: {
        id: subjectId,
      },
    });
    return subject;
  }

  async edit(subjectId: number, data: Subject) {
    const candidate = await prisma.subjects.findFirst({
      where: {
        id: {
          not: subjectId,
        },
        name: {
          equals: data.name,
          mode: "insensitive",
        },
      },
    });
    if (candidate) {
      throw ApiError.ClientError("Предмет с таким названием уже существует");
    }

    const response = await prisma.subjects.updateMany({
      where: {
        id: subjectId,
      },
      data: {
        ...data,
      },
    });

    if (response.count > 0) {
      return { message: "Вы успешно обновили данные предмета" };
    }
    throw ApiError.ClientError("Не удалось обновить данные предмета");
  }

  async delete(subjectId: number) {
    const response = await prisma.subjects.deleteMany({
      where: {
        id: subjectId,
      },
    });
    if (response.count > 0) {
      return { message: "Вы успешно удалили предмет" };
    }
    throw ApiError.ClientError("Не удалось удалить предмет");
  }
}

export default new SubjectsServices();
