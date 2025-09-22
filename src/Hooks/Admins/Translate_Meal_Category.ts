'use client'
import { useActionState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/Libs/Store/Store";
import { useTranslations } from "next-intl";
import { createTranslateMeal } from "@/Features/Actions/TranslateMealActions";
import { CreateTranslateMeal } from "@/Interfaces/TranslateMealInterface";

export default function Translate_Meal_Category() {
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
  return {t,ActionStat,AllLanguages,AllMeals,error,Meal,loading,}
}
