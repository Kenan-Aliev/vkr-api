-- CreateTable
CREATE TABLE "AdSources" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AdSources_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdSources_name_key" ON "AdSources"("name");
