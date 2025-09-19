'use client'
import { UpdateMeal } from "@/Interfaces/MealInterface"
import { RootState, useAppSelector } from "@/Libs/Store/Store"
import Meal_content from "./Meal_content"
import * as icon from '@/Utils/Icons';
import { useTranslations } from "next-intl";

export default function Meals_Container() {
  const { AllMeals } = useAppSelector((state: RootState) => state.meals)
  const t= useTranslations('dashboard.meals')

  return (
    <>
    {/*Meals Table Container*/}
    <div className="w-full overflow-x-auto scrollbar-none flex flex-col justify-start items-start relative">
      {/*Section Title*/}
      <h1 className="text-xl font-bold my-4 text-primary flex justify-between items-center">
        <icon.FaBoxOpen className="text-3xl mx-2" />
        {t('allmeals')} {`(${AllMeals?.meals?.length})`}
      </h1>
      {/*Search Input*/}
      <input type="search" name="" id="" placeholder="Search For Meal..." className="w-full bg-gray-200 my-1 p-2 rounded "/>
      {/*Meals Table*/}
      <table className="w-full  border border-gray-200 table">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border border-[#E4E5EE]">{t('image')}</th>
            <th className="p-2 border border-[#E4E5EE]">{t('title')}</th>
            <th className="p-2 border border-[#E4E5EE]">{t('description')}</th>
            <th className="p-2 border border-[#E4E5EE]">{t('category')}</th>
            <th className="p-2 border border-[#E4E5EE]">{t('quantity')}</th>
            <th className="p-2 border border-[#E4E5EE]">{t('price')}</th>
            <th className="p-2 border border-[#E4E5EE]">{t('offer')}</th>
          </tr>
        </thead>
        <tbody>
          {
            AllMeals?.meals?.map((Meal: UpdateMeal) =>
              <Meal_content key={Meal?.id} Meal={Meal} />
            )
          }
        </tbody>
      </table>
    </div>
    </>
  )
}
