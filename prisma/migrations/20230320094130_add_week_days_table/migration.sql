-- CreateTable
CREATE TABLE "WeekDays" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "WeekDays_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WeekDays_name_key" ON "WeekDays"("name");
