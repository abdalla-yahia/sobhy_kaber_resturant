/*
  Warnings:

  - You are about to drop the column `languageId` on the `CategoryTranslation` table. All the data in the column will be lost.
  - You are about to drop the column `languageId` on the `MealTranslation` table. All the data in the column will be lost.
  - You are about to drop the `Language` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[categoryId,LocalId]` on the table `CategoryTranslation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mealId,LocalId]` on the table `MealTranslation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `LocalId` to the `CategoryTranslation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LocalId` to the `MealTranslation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."CategoryTranslation" DROP CONSTRAINT "CategoryTranslation_languageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MealTranslation" DROP CONSTRAINT "MealTranslation_languageId_fkey";

-- DropIndex
DROP INDEX "public"."CategoryTranslation_categoryId_languageId_key";

-- DropIndex
DROP INDEX "public"."MealTranslation_mealId_languageId_key";

-- AlterTable
ALTER TABLE "public"."CategoryTranslation" DROP COLUMN "languageId",
ADD COLUMN     "LocalId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."MealTranslation" DROP COLUMN "languageId",
ADD COLUMN     "LocalId" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."Language";

-- CreateTable
CREATE TABLE "public"."Local" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Local_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Local_code_key" ON "public"."Local"("code");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryTranslation_categoryId_LocalId_key" ON "public"."CategoryTranslation"("categoryId", "LocalId");

-- CreateIndex
CREATE UNIQUE INDEX "MealTranslation_mealId_LocalId_key" ON "public"."MealTranslation"("mealId", "LocalId");

-- AddForeignKey
ALTER TABLE "public"."CategoryTranslation" ADD CONSTRAINT "CategoryTranslation_LocalId_fkey" FOREIGN KEY ("LocalId") REFERENCES "public"."Local"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MealTranslation" ADD CONSTRAINT "MealTranslation_LocalId_fkey" FOREIGN KEY ("LocalId") REFERENCES "public"."Local"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
