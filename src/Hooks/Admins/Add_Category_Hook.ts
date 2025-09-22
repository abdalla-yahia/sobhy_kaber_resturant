'use client'
import { useActionState, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/Libs/Store/Store";
import { CreateCategory } from "@/Interfaces/CategoryInterface";
import { CreateCategoryValidation } from "@/Validations/CategoryValidation";
import { toast } from "react-toastify";
import { createCategory } from "@/Features/Actions/CategoriesActions";
import { useTranslations } from "next-intl";

export default function Add_Category_Hook() {
    const [imageUrl, setImageUrl] = useState<string>('');
      const { category, error, loading } = useAppSelector((state: RootState) => state.category)
      const t = useTranslations('dashboard.addnewcategory')
      const dispatch = useAppDispatch()
      //Create Item Handler
      const CreateItem = (prevState: CreateCategory, formData: FormData): CreateCategory => {
        const formstate = {
          ...prevState,
          title: formData.get('CategoryTitle') as string,
          description: formData.get('CategoryDescription') as string,
          image: imageUrl
        }
        //Check Validation 
        const Validation = CreateCategoryValidation.safeParse(formstate)
        if (!Validation?.success) {
          toast.warning(Validation?.error?.issues?.map(e => e?.message)?.join(', '))
          return formstate;
        }
        //Send Data 
        dispatch(createCategory(Validation?.data))
        return formstate
      }
      //Initial State
      const InitialState = {
        title: '',
        description: '',
        image: ''
      }
    
      const [, ActionStat] = useActionState(CreateItem, InitialState)
  return {t,ActionStat,imageUrl,setImageUrl,error,category,loading,}
}
