import { Book } from "@/interfaces";
import { ApiError } from "@/utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class BooksServices {
  async create(data: Book) {
    const candidate = await prisma.books.findFirst({
      where: {
        title: data.title,
        branchId: data.branchId,
        subjectId: data.subjectId,
      },
    });
    if (candidate) {
      throw ApiError.ClientError(
        "Книга с таким названием и предметом уже существует в указанном филиале"
      );
    }
    const book = await prisma.books.create({
      data: {
        ...data,
      },
    });
    return book;
  }
}

export default new BooksServices();
