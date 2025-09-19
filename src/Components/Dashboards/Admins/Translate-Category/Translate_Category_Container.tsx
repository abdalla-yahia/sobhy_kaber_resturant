'use client'
import { useActionState } from "react";
import * as icon from '@/Utils/Icons';
import { RootState, useAppDispatch, useAppSelector } from "@/Libs/Store/Store";
import { UpdateCategory } from "@/Interfaces/CategoryInterface";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { createTranslateCategory } from "@/Features/Actions/TranslateCategoryActions";
import { CreateTranslateCategory } from "@/Interfaces/TranslateCategoryInterface";

export default function Translate_Category_Container() {
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
        {/*Category Titles for all languages*/}
          <div className="flex flex-wrap">
            {AllLanguages?.Language?.map((language) => (
              <div key={language?.id} className='flex justify-center items-center w-full md:w-1/3 gap-3 py-4'>
                <label htmlFor={`CategoryTitle_${language.code}`} className="flex gap-1">
                  {language?.code}
                  <Image src={language?.flage} alt={language?.name as string || 'flag'} width={20} height={20}/>
                </label>
                <input 
                  type="text" 
                  name={`CategoryTitle_${language.code}`} 
                  id={`CategoryTitle_${language.code}`} 
                  placeholder={`${t('title')} - ${language?.code}`} 
                  className='p-2 bg-[#F3F4F7] rounded w-full border' 
                />
              </div>
            ))}
          </div>
        
        {/*CategoryID*/}
          <div className='flex flex-col justify-start items-start w-full gap-3 py-4'>
            <label htmlFor="MealQuantity">{t('selectcategory')}:</label>
            <select name="CategoryId"  className=' bg-[#F3F4F7] w-full  p-2 rounded border'>
              <option value="" disabled selected>{t('selectcategory')}</option>
              {
                AllCategories?.categories?.map((category: UpdateCategory) =>
                  <option key={category?.id} value={category?.id}>{category?.title}</option>
                )
              }
            </select>
          </div>
        {/*Submit Button*/}
        {
          error && <p className="text-red-500">{t('faild')}</p>
        }
        {
          category?.category?.title && <p className="text-green-500">{t('success')}</p>
        }
        <div className='flex flex-col justify-start items-start w-full gap-3 py-4'>
          <button type="submit" id="CategoryDescription" className='p-2 border border-[#F3F4F7] text-white cursor-pointer bg-primary rounded w-full'>
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
