'use client'
import { useActionState, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/Libs/Store/Store";
import { useTranslations } from "next-intl";
import { CreateLanguage } from "@/Interfaces/LanguageInterface";
import { createLanguage } from "@/Features/Actions/LanguageActions";

export default function Add_Language_Hook() {
     const [imageUrl, setImageUrl] = useState<string>('');
      const { Language, error, loading } = useAppSelector((state: RootState) => state.language)
      const t = useTranslations('dashboard.addnewLanguage')
      const dispatch = useAppDispatch()
      //Create Item Handler
      const CreateItem = (prevState: CreateLanguage, formData: FormData): CreateLanguage => {
        const formstate = {
          ...prevState,
          code: formData.get('LanguageCode') as string,
          name: formData.get('LanguageName') as string,
          flage: imageUrl
        }
    console.log(formstate)
        //Send Data 
        dispatch(createLanguage(formstate))
        return formstate
      }
      //Initial State
      const InitialState = {
        code: '',
        name: '',
        flage: ''
      }
    
      const [, ActionStat] = useActionState(CreateItem, InitialState)
  return {t,ActionStat,imageUrl,setImageUrl,error,Language,loading}
}
