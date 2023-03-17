/*
  Warnings:

  - You are about to drop the `manager` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `student` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `superadmin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teacher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `token` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('SUPERADMIN', 'MANAGER', 'STUDENT', 'TEACHER', 'USER');

-- DropForeignKey
ALTER TABLE "manager" DROP CONSTRAINT "manager_userId_fkey";

-- DropForeignKey
ALTER TABLE "student" DROP CONSTRAINT "student_userId_fkey";

-- DropForeignKey
ALTER TABLE "superadmin" DROP CONSTRAINT "superadmin_userId_fkey";

-- DropForeignKey
ALTER TABLE "teacher" DROP CONSTRAINT "teacher_userId_fkey";

-- DropForeignKey
ALTER TABLE "token" DROP CONSTRAINT "token_userId_fkey";

-- DropTable
DROP TABLE "manager";

-- DropTable
DROP TABLE "student";

-- DropTable
DROP TABLE "superadmin";

-- DropTable
DROP TABLE "teacher";

-- DropTable
DROP TABLE "token";

-- DropTable
DROP TABLE "user";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "role" "Roles" NOT NULL DEFAULT 'USER',
    "password" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Superadmins" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Superadmins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Managers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "patronymic" TEXT NOT NULL,
    "date_birth" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Managers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Students" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "date_birth" TIMESTAMP(3) NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "blacklist" BOOLEAN NOT NULL DEFAULT false,
    "comment" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teachers" (
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

    CONSTRAINT "Teachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tokens" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_phone_key" ON "Users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Superadmins_userId_key" ON "Superadmins"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Managers_userId_key" ON "Managers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Students_userId_key" ON "Students"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Teachers_userId_key" ON "Teachers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Tokens_userId_key" ON "Tokens"("userId");

-- AddForeignKey
ALTER TABLE "Superadmins" ADD CONSTRAINT "Superadmins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Managers" ADD CONSTRAINT "Managers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teachers" ADD CONSTRAINT "Teachers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tokens" ADD CONSTRAINT "Tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
