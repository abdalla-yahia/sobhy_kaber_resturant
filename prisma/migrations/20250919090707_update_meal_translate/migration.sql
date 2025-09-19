/*
  Warnings:

  - The primary key for the `MealTranslation` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "public"."MealTranslation" DROP CONSTRAINT "MealTranslation_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "MealTranslation_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "MealTranslation_id_seq";
