'use client'
import { useActionState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/Libs/Store/Store";
import { useTranslations } from "next-intl";
import { createTranslateCategory } from "@/Features/Actions/TranslateCategoryActions";
import { CreateTranslateCategory } from "@/Interfaces/TranslateCategoryInterface";

export default function Translate_Category_Hook() {
      const { category, error, loading } = useAppSelector((state: RootState) => state.category)
      const { AllCategories } = useAppSelector((state: RootState) => state.category)
      const { AllLanguages } = useAppSelector((state: RootState) => state.language)
      const t = useTranslations('dashboard.translateCategory')
      const dispatch = useAppDispatch()
      //Create Item Handler
     const CreateItem = (prevState: CreateTranslateCategory, formData: FormData): CreateTranslateCategory => {
      const categoryId = formData.get('CategoryId') as string;
    
      const translations = AllLanguages?.Language?.map((language) => ({
        name: formData.get(`CategoryTitle_${language.code}`) as string,
        description: formData.get(`CategoryDescription_${language.code}`) as string,
        categoryId: categoryId,
        LocalId: language.code
      })) || [];
    
    
      dispatch(createTranslateCategory({ translations }));
      return prevState;
    };
      //Initial State
      const InitialState: CreateTranslateCategory = {
        translations: []
      };
    
      const [, ActionStat] = useActionState(CreateItem, InitialState)

  return {t,ActionStat,AllLanguages,AllCategories,error,category,loading}
}
