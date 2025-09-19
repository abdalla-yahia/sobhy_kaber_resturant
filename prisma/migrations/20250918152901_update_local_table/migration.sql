/*
  Warnings:

  - Added the required column `flage` to the `Local` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Local" ADD COLUMN     "flage" TEXT NOT NULL;
