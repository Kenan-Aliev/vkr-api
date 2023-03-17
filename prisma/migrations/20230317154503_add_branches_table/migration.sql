-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "branchId" INTEGER;

-- CreateTable
CREATE TABLE "Branches" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Branches_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branches"("id") ON DELETE SET NULL ON UPDATE CASCADE;
