'use client'
import { useActionState } from "react";
import * as icon from '@/Utils/Icons';
import { RootState, useAppDispatch, useAppSelector } from "@/Libs/Store/Store";
import { UpdateMeal } from "@/Interfaces/MealInterface";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { createTranslateMeal } from "@/Features/Actions/TranslateMealActions";
import { CreateTranslateMeal } from "@/Interfaces/TranslateMealInterface";

export default function Translate_Meal_Container() {
  const { Meal, error, loading } = useAppSelector((state: RootState) => state.meals)
  const { AllMeals } = useAppSelector((state: RootState) => state.meals)
  const { AllLanguages } = useAppSelector((state: RootState) => state.language)
  const t = useTranslations('dashboard.translateMeal')
  const dispatch = useAppDispatch()
  //Create Item Handler
 const CreateItem = (prevState: CreateTranslateMeal, formData: FormData): CreateTranslateMeal => {
  const MealId = formData.get('MealId') as string;

  const translations = AllLanguages?.Language?.map((language) => ({
    name: formData.get(`MealTitle_${language.code}`) as string,
    description: formData.get(`MealDescription_${language.code}`) as string,
    mealId: MealId,
    LocalId: language.code
  })) || [];


  dispatch(createTranslateMeal({ translations }));
  return prevState;
};
  //Initial State
  const InitialState: CreateTranslateMeal = {
    translations: []
  };

  const [, ActionStat] = useActionState(CreateItem, InitialState)
  return (
    <div className="w-full flex flex-col justify-start items-center gap-5 p-8">
      {/*Section Title*/}
      <h1 className="text-2xl font-[600] gap-2 mb-5 text-primary mr-auto flex justify-center items center">
        {/* SVG Icon */}
        <icon.IoPricetagsSharp />
        {t('header')}
      </h1>
      {/*Form */}
      <form action={ActionStat} className="w-full md:w-[70%]">
        {/*Meal Titles for all languages*/}
          <div className="flex flex-wrap">
            {AllLanguages?.Language?.map((language) => (
              <div key={language?.id} className='flex justify-center items-center w-full md:w-1/3 gap-3 py-4'>
                <label htmlFor={`MealTitle_${language.code}`} className="flex gap-1">
                  {language?.code}
                  <Image src={language?.flage} alt={language?.name as string || 'flag'} width={20} height={20}/>
                </label>
                <input 
                  type="text" 
                  name={`MealTitle_${language.code}`} 
                  id={`MealTitle_${language.code}`} 
                  placeholder={`${t('title')} - ${language?.code}`} 
                  className='p-2 bg-[#F3F4F7] rounded w-full border' 
                />
              </div>
            ))}
          </div>
        
        {/*MealID*/}
          <div className='flex flex-col justify-start items-start w-full gap-3 py-4'>
            <label htmlFor="MealQuantity">{t('selectMeal')}:</label>
            <select name="MealId"  className=' bg-[#F3F4F7] w-full  p-2 rounded border'>
              <option value="" disabled selected>{t('selectMeal')}</option>
              {
                AllMeals?.meals?.map((Meal: UpdateMeal) =>
                  <option key={Meal?.id} value={Meal?.id}>{Meal?.title}</option>
                )
              }
            </select>
          </div>
        {/*Submit Button*/}
        {
          error && <p className="text-red-500">{t('faild')}</p>
        }
        {
          Meal?.Meal?.title && <p className="text-green-500">{t('success')}</p>
        }
        <div className='flex flex-col justify-start items-start w-full gap-3 py-4'>
          <button type="submit" id="MealDescription" className='p-2 border border-[#F3F4F7] text-white cursor-pointer bg-primary rounded w-full'>
            {loading ? (
              <>
                <div className="w-full flex justify-center items-center gap-2">
                  <icon.LuLoader className="h-4 w-4 animate-spin" />
                  {t('save')}...
                </div>
              </>
            )

              : `${t('save')}`}
          </button>
        </div>
      </form>
    </div>
  )
}
