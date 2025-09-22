'use client'
import { useActionState, useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/Libs/Store/Store";
import { CreateMeal } from "@/Interfaces/MealInterface";
import { CreateMealValidation } from "@/Validations/MealValidation";
import { toast } from "react-toastify";
import { createMeal } from "@/Features/Actions/MealsActions";
import { useTranslations } from "next-intl";

export default function Add_Meals_Hook() {
    const [imageUrl, setImages] = useState<string[]>([]);
      const { Meal, error, loading } = useAppSelector((state: RootState) => state.meals)
      const { AllCategories } = useAppSelector((state: RootState) => state.category)
      const t= useTranslations('dashboard.addnewmeal')
      const dispatch = useAppDispatch()
      //Create Item Handler
      const CreateItem = (prevState: CreateMeal, formData: FormData): CreateMeal => {
        const formstate = {
          ...prevState,
          title: formData.get('MealTitle') as string,
          description: formData.get('MealDescription') as string,
          offer: formData.get('MealOffer') as string,
          price: Number(formData.get('MealPrice')),
          quantity: Number(formData.get('MealQuantity')),
          categoryId: formData.get('CategoryId') as string,
          image: imageUrl && imageUrl[0],
          gallery: imageUrl as string[]
        }
        //Check Validation 
        const Validation = CreateMealValidation.safeParse(formstate)
        if (!Validation?.success) {
          toast.warning(Validation?.error?.issues?.map(e => e?.message)?.join(', '))
          return formstate;
        }
        //Send Data 
        dispatch(createMeal(Validation?.data))
        return formstate
      }
      //Initial State
      const InitialState = {
        title: '',
        description: '',
        offer: '',
        image: '',
        slug: "",
        price: 0,
        quantity: 1,
        oldPrice: 0,
        categoryId: '',
        brandId: '',
        gallery: []
      }
    
      const [, ActionStat] = useActionState(CreateItem, InitialState)
      //Rest Image Galary
      useEffect(() => {
        if (Meal?.status === 201) {
          window?.location.reload()
        }
      }, [Meal?.status])

  return {AllCategories,t,ActionStat,imageUrl,setImages,error,Meal,loading}
}
