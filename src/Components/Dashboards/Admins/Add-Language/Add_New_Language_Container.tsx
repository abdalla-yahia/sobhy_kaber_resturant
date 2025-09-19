'use client'
import { SetStateAction, useActionState, useState } from "react";
import * as icon from '@/Utils/Icons';
import { RootState, useAppDispatch, useAppSelector } from "@/Libs/Store/Store";
import UploadOneImage from "@/Utils/UploadOneImage";
import { useTranslations } from "next-intl";
import { CreateLanguage } from "@/Interfaces/LanguageInterface";
import { createLanguage } from "@/Features/Actions/LanguageActions";

export default function Add_New_Language_Container() {
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
        {/*Language Image*/}
        <UploadOneImage imageUrl={imageUrl} setImageUrl={setImageUrl as (urls: string) => SetStateAction<string>} />
        {/*Language Image URL*/}
        <div className='flex flex-col justify-start items-start w-full gap-3 py-4'>
          <label htmlFor="LanguageUrl">{t('image')}:</label>
          <input onChange={(e) => setImageUrl(e.target.value)} type="text" name="LanguageUrl" id="LanguageUrl" className='p-2 bg-[#F3F4F7] rounded w-full border' />
        </div>
        {/*Language Code*/}
        <div className='flex flex-col justify-start items-start w-full gap-3 py-4'>
          <label htmlFor="LanguageCode">{t('title')}:</label>
          <input type="text" name="LanguageCode" id="LanguageCode" className='p-2 bg-[#F3F4F7] rounded w-full border' />
        </div>
        {/*Language Name*/}
        <div className='flex flex-col justify-start items-start w-full gap-3 py-4'>
          <label htmlFor="LanguageName">{t('description')}:</label>
          <input type="text" name="LanguageName" id="LanguageName" className='p-2 bg-[#F3F4F7] rounded w-full border' />
        </div>
        {/*Submit Button*/}
        {
          error && <p className="text-red-500">{t('faild')}</p>
        }
        {
          Language?.Language?.code && <p className="text-green-500">{t('success')}</p>
        }
        <div className='flex flex-col justify-start items-start w-full gap-3 py-4'>
          <button type="submit" id="LanguageDescription" className='p-2 border border-[#F3F4F7] text-white cursor-pointer bg-primary rounded w-full'>
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
