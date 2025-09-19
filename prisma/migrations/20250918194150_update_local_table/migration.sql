-- DropForeignKey
ALTER TABLE "public"."CategoryTranslation" DROP CONSTRAINT "CategoryTranslation_LocalId_fkey";

-- AddForeignKey
ALTER TABLE "public"."CategoryTranslation" ADD CONSTRAINT "CategoryTranslation_LocalId_fkey" FOREIGN KEY ("LocalId") REFERENCES "public"."Local"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
