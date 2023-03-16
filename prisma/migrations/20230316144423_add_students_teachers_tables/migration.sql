/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TeacherStatus" AS ENUM ('Working', 'Fired', 'Vacation');

-- DropForeignKey
ALTER TABLE "manager" DROP CONSTRAINT "manager_userId_fkey";

-- DropForeignKey
ALTER TABLE "superadmin" DROP CONSTRAINT "superadmin_userId_fkey";

-- DropForeignKey
ALTER TABLE "token" DROP CONSTRAINT "token_userId_fkey";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',
    "password" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "date_birth" TIMESTAMP(3) NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "blacklist" BOOLEAN NOT NULL DEFAULT false,
    "comment" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teacher" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "inn" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "date_birth" TIMESTAMP(3) NOT NULL,
    "staj" TEXT NOT NULL,
    "comment" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "status" "TeacherStatus" NOT NULL DEFAULT 'Working',
    "userId" INTEGER NOT NULL,

    CONSTRAINT "teacher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "student_userId_key" ON "student"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "teacher_userId_key" ON "teacher"("userId");

-- AddForeignKey
ALTER TABLE "superadmin" ADD CONSTRAINT "superadmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manager" ADD CONSTRAINT "manager_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher" ADD CONSTRAINT "teacher_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "token" ADD CONSTRAINT "token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
