'use client'
import { SetStateAction, useActionState, useState } from "react";
import * as icon from '@/Utils/Icons';
import { RootState, useAppDispatch, useAppSelector } from "@/Libs/Store/Store";
import { CreateCategory } from "@/Interfaces/CategoryInterface";
import { CreateCategoryValidation } from "@/Validations/CategoryValidation";
import { toast } from "react-toastify";
import { createCategory } from "@/Features/Actions/CategoriesActions";
import UploadOneImage from "@/Utils/UploadOneImage";
import { useTranslations } from "next-intl";

export default function Add_New_Category_Container() {
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
        {/*Category Image*/}
        <UploadOneImage imageUrl={imageUrl} setImageUrl={setImageUrl as (urls: string) => SetStateAction<string>} />
        {/*Category Image URL*/}
        <div className='flex flex-col justify-start items-start w-full gap-3 py-4'>
          <label htmlFor="CategoryUrl">{t('image')}:</label>
          <input onChange={(e) => setImageUrl(e.target.value)} type="text" name="CategoryUrl" id="CategoryUrl" className='p-2 bg-[#F3F4F7] rounded w-full border' />
        </div>
        {/*Category Title*/}
        <div className='flex flex-col justify-start items-start w-full gap-3 py-4'>
          <label htmlFor="CategoryTitle">{t('title')}:</label>
          <input type="text" name="CategoryTitle" id="CategoryTitle" className='p-2 bg-[#F3F4F7] rounded w-full border' />
        </div>
        {/*Category Description*/}
        <div className='flex flex-col justify-start items-start w-full gap-3 py-4'>
          <label htmlFor="CategoryDescription">{t('description')}:</label>
          <input type="text" name="CategoryDescription" id="CategoryDescription" className='p-2 bg-[#F3F4F7] rounded w-full border' />
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
