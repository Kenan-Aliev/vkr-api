import { Branch } from "@/interfaces";
import { PrismaClient } from "@prisma/client";
import { ApiError } from "@/utils";

const prisma = new PrismaClient();

class BranchesServices {
  async create(data: Branch) {
    const candidate = await prisma.branches.findFirst({
      where: {
        name: {
          equals: data.name,
          mode: "insensitive",
        },
      },
    });
    if (candidate) {
      throw ApiError.ClientError("Филиал с таким названием уже существует");
    }
    const newBranch = await prisma.branches.create({
      data: {
        ...data,
      },
    });
    return newBranch;
  }

  async edit(branchId: number, data: Branch) {
    const candidate = await prisma.branches.findFirst({
      where: {
        id: {
          not: branchId,
        },
        name: {
          equals: data.name,
          mode: "insensitive",
        },
      },
    });
    if (candidate) {
      throw ApiError.ClientError("Филиал с таким названием уже существует");
    }
    const updatedBranch = await prisma.branches.update({
      where: {
        id: branchId,
      },
      data: {
        ...data,
      },
    });
    return updatedBranch;
  }

  async getById(branchId: number) {
    const branch = await prisma.branches.findFirst({
      where: {
        id: branchId,
      },
    });
    return branch;
  }

  async getList() {
    const branches = await prisma.branches.findMany();
    return branches;
  }

  async delete(branchId: number) {
    const deleted = await prisma.branches.deleteMany({
      where: {
        id: branchId,
      },
    });
    if (deleted.count > 0) {
      return { message: "Вы успешно удалили филиал" };
    }
    throw ApiError.ClientError("Филиала с таким id не существует");
  }
}

export default new BranchesServices();
