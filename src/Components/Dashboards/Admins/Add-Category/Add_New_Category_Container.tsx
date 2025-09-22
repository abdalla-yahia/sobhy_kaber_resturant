'use client'
import UploadOneImage from "@/Utils/UploadOneImage";
import * as icon from '@/Utils/Icons';
import Add_Category_Hook from "@/Hooks/Admins/Add_Category_Hook";
import { SetStateAction } from "react";

export default function Add_New_Category_Container() {
  const {t,ActionStat,imageUrl,setImageUrl,error,category,loading,} = Add_Category_Hook()
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
