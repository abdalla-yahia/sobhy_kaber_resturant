'use client'
import { useActionState, useState } from "react";
import * as icon from '@/Utils/Icons';
import { RootState, useAppDispatch, useAppSelector } from "@/Libs/Store/Store";
import { UpdateCategoryValidation } from "@/Validations/CategoryValidation";
import { toast } from "react-toastify";
import { updateCategory } from "@/Features/Actions/CategoriesActions";
import { UpdateCategory } from "@/Interfaces/CategoryInterface";
import UploadOneImage from "@/Utils/UploadOneImage";
import { clearCategory } from "@/Features/Slices/CategoriesSlice";
import { useTranslations } from "next-intl";

export default function Edit_Category_Form({ Category, setIsToggle }: { Category: UpdateCategory, setIsToggle: (arg0: boolean) => void }) {
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
  return (
    <div className="w-[50%] absolute -top-[100%] bg-[#ddd] rounded left-0 flex flex-col justify-start items-center gap-5 p-8">
      {/*Close Form*/}
      <icon.IoClose onClick={() => setIsToggle(false)} className="text-xl absolute top-3 right-3 cursor-pointer" />
      {/*Section Title*/}
      <h1 className="text-2xl font-[600] gap-2 mb-5 text-primary mr-auto flex justify-center items center">
        {/* Icon */}
        <icon.IoPricetagsSharp />
        {t('updateheader')}
      </h1>
      {/*Form */}
      <form action={ActionStat} className="w-[70%]">
        {/*Category Image*/}
        <UploadOneImage imageUrl={imageUrl as unknown as string} setImageUrl={setImageUrl} />
        {/*Category Image URL*/}
        <div className='flex flex-col justify-start items-start w-full gap-3 py-4'>
          <label htmlFor="CategoryUrl">{t('image')}:</label>
          <input type="text" name="CategoryUrl" id="CategoryUrl" className='p-2 bg-[#F3F4F7] rounded w-full' />
        </div>
        {/*Category Title*/}
        <div className='flex flex-col justify-start items-start w-full gap-3 py-4'>
          <label htmlFor="CategoryTitle">{t('title')}:</label>
          <input placeholder={Category?.title} type="text" name="CategoryTitle" id="CategoryTitle" className='p-2 bg-[#F3F4F7] rounded w-full' />
        </div>
        {/*Category Description*/}
        <div className='flex flex-col justify-start items-start w-full gap-3 py-4'>
          <label htmlFor="CategoryDescription">{t('description')}:</label>
          <input placeholder={Category?.description} type="text" name="CategoryDescription" id="CategoryDescription" className='p-2 bg-[#F3F4F7] rounded w-full' />
        </div>

        {/*Submit Button*/}
        {
          error && <p className="text-red-500">{t('faild')}</p>
        }
        {
          EditCategory?.category?.title && <p className="text-green-500">{t('success')}</p>
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


