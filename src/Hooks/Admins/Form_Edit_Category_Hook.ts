'use client'
import { useActionState, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/Libs/Store/Store";
import { UpdateCategoryValidation } from "@/Validations/CategoryValidation";
import { toast } from "react-toastify";
import { updateCategory } from "@/Features/Actions/CategoriesActions";
import { clearCategory } from "@/Features/Slices/CategoriesSlice";
import { useTranslations } from "next-intl";
import { UpdateCategory } from "@/Interfaces/CategoryInterface";

export default function Form_Edit_Category_Hook({ Category, setIsToggle }: { Category: UpdateCategory, setIsToggle: (arg0: boolean) => void }) {
      const [imageUrl, setImageUrl] = useState<string>(Category?.image as string);
      const { category: EditCategory, error, loading } = useAppSelector((state: RootState) => state.category)
      const t= useTranslations('dashboard.addnewcategory')
      const dispatch = useAppDispatch()
      //Create Item Handler
      const UpdateItem = (prevState: UpdateCategory, formData: FormData): UpdateCategory => {
        const formstate = {
          ...prevState,
          id: Category?.id,
          title: formData.get('CategoryTitle') as string || Category?.title,
          description: formData.get('CategoryDescription') as string || Category?.description,
          image: formData.get('CategoryUrl') as string || imageUrl,
        }
        //Check Validation 
        const Validation = UpdateCategoryValidation?.safeParse(formstate)
        if (!Validation?.success) {
          toast.warning(Validation?.error?.issues?.map(e => e?.message)?.join(', '))
          return formstate;
        }
        //Send Data 
        dispatch(updateCategory(formstate))
        return formstate
      }
      //Initial State
      const InitialState = {
        id: Category?.id,
        title: Category?.title,
        description: Category?.description,
        image: Category?.image,
      }
    
      const [, ActionStat] = useActionState(UpdateItem, InitialState)
      if (EditCategory?.category?.title) {
        setIsToggle(false)
        dispatch(clearCategory())
      }
  return {t,ActionStat,imageUrl,setImageUrl,error,EditCategory,loading}
}
