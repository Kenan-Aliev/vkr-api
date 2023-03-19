-- CreateTable
CREATE TABLE "Tariffs" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "total_price" INTEGER NOT NULL,
    "price_for_lesson" INTEGER NOT NULL,

    CONSTRAINT "Tariffs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tariffs_name_key" ON "Tariffs"("name");
