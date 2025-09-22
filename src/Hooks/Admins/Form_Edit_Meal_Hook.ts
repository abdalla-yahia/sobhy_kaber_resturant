'use client'
import { useActionState, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/Libs/Store/Store";
import { UpdateMeal } from "@/Interfaces/MealInterface";
import { UpdataMealValidation } from "@/Validations/MealValidation";
import { toast } from "react-toastify";
import { updateMeal } from "@/Features/Actions/MealsActions";
import { useTranslations } from "next-intl";

export default function Form_Edit_Meal_Hook({ Meal, setIsToggle }: { Meal: UpdateMeal, setIsToggle: (arg0: boolean) => void }) {
      const [imageUrl, setImages] = useState<string[]>(Meal?.gallery || []);
      const { Meal: EditMeal, error, loading } = useAppSelector((state: RootState) => state.meals)
      const { AllCategories } = useAppSelector((state: RootState) => state.category)
      const t =useTranslations('dashboard.addnewmeal')
      const dispatch = useAppDispatch()
    
      //Create Item Handler
      const UpdateItem = (prevState: UpdateMeal, formData: FormData): UpdateMeal => {
        const formstate = {
          ...prevState,
          slig: Meal?.slug,
          title: formData.get('MealTitle') as string || Meal?.title,
          description: formData.get('MealDescription') as string || Meal?.description,
          offer: formData.get('MealOffer') as string || Meal?.offer,
          price: Number(formData.get('MealPrice')) || Meal?.price,
          oldPrice: Number(formData.get('MealOldPrice')),
          quantity: Number(formData.get('MealQuantity')),
          categoryId: formData.get('CategoryId') as string,
          brandId: formData.get('BrandId') as string,
          image: imageUrl && imageUrl[0],
          gallery: imageUrl as string[]
        }
        //Check Validation 
        const Validation = UpdataMealValidation.safeParse(formstate)
        if (!Validation?.success) {
          toast.warning(Validation?.error?.issues?.map(e => e?.message)?.join(', '))
          return formstate;
        }
        //Send Data 
        dispatch(updateMeal(Validation?.data))
        return formstate
      }
      //Initial State
      const InitialState = {
        slug: Meal?.slug,
        title: Meal?.title,
        description: Meal?.description,
        offer: Meal?.offer,
        image: Meal?.image,
        price: Meal?.price,
        quantity: Meal?.quantity,
        categoryId: Meal?.categoryId,
        gallery: Meal?.gallery
      }
    
      const [, ActionStat] = useActionState(UpdateItem, InitialState)
      //Close Window After Update Success
      if (EditMeal?.status === 201) {
        setIsToggle(false)
        window?.location.reload()
    
      }
  return {t,ActionStat,imageUrl,setImages,AllCategories,error,EditMeal,loading}
}
