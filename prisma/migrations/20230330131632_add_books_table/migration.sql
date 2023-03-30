-- CreateTable
CREATE TABLE "Books" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "subjectId" INTEGER,
    "branchId" INTEGER,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Books_title_branchId_subjectId_key" ON "Books"("title", "branchId", "subjectId");

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subjects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Books" ADD CONSTRAINT "Books_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branches"("id") ON DELETE SET NULL ON UPDATE CASCADE;
