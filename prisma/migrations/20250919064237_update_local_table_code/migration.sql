/*
  Warnings:

  - The primary key for the `CategoryTranslation` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "public"."CategoryTranslation_categoryId_LocalId_key";

-- AlterTable
ALTER TABLE "public"."CategoryTranslation" DROP CONSTRAINT "CategoryTranslation_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "CategoryTranslation_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "CategoryTranslation_id_seq";
