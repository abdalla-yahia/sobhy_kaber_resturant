-- DropForeignKey
ALTER TABLE "public"."MealTranslation" DROP CONSTRAINT "MealTranslation_LocalId_fkey";

-- DropIndex
DROP INDEX "public"."MealTranslation_mealId_LocalId_key";

-- AddForeignKey
ALTER TABLE "public"."MealTranslation" ADD CONSTRAINT "MealTranslation_LocalId_fkey" FOREIGN KEY ("LocalId") REFERENCES "public"."Local"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
