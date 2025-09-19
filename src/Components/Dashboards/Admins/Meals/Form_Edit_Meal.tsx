'use client'
import UploadImages from "@/Utils/UploadImage";
import { SetStateAction, useActionState, useState } from "react";
import * as icon from '@/Utils/Icons';
import { RootState, useAppDispatch, useAppSelector } from "@/Libs/Store/Store";
import { UpdateMeal } from "@/Interfaces/MealInterface";
import { UpdataMealValidation } from "@/Validations/MealValidation";
import { toast } from "react-toastify";
import { updateMeal } from "@/Features/Actions/MealsActions";
import { UpdateCategory } from "@/Interfaces/CategoryInterface";
import { useTranslations } from "next-intl";

export default function Edit_Meal_Form({ Meal, setIsToggle }: { Meal: UpdateMeal, setIsToggle: (arg0: boolean) => void }) {
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
  return (
    <div className="w-[50%] absolute top-0 bg-[#ddd] rounded left-0 flex flex-col justify-start items-center gap-5 p-8">
      {/*Close Form*/}
      <icon.IoClose onClick={() => setIsToggle(false)} className="text-xl absolute top-3 right-3 cursor-pointer" />
      {/*Section Title*/}
      <h1 className="text-2xl font-[600] gap-2 mb-5 text-primary mr-auto flex justify-center items center">
        {/* Icon */}
        <icon.GrDocumentUpdate />
        {t('updateheader')}
      </h1>
      {/*Form */}
      <form action={ActionStat} className="w-[70%]">
        {/*Meal Image*/}
        <UploadImages images={imageUrl} setImages={setImages as (urls: string[]) => SetStateAction<string[]>} />
        {/*Meal Image URL*/}
        <div className='flex flex-col justify-start items-start w-full gap-3 py-4'>
          <label htmlFor="MealUrl">{t('image')}:</label>
          <input onChange={(e) => setImages([e.target.value])} type="text" name="MealUrl" id="MealUrl" className='p-2 bg-[#F3F4F7] rounded w-full' />
        </div>
        {/*Meal Title*/}
        <div className='flex flex-col justify-start items-start w-full gap-3 py-4'>
          <label htmlFor="MealTitle">{t('title')}:</label>
          <input placeholder={Meal?.title} type="text" name="MealTitle" id="MealTitle" className='p-2 bg-[#F3F4F7] rounded w-full' />
        </div>
        {/*Meal Description*/}
        <div className='flex flex-col justify-start items-start w-full gap-3 py-4'>
          <label htmlFor="MealDescription">{t('description')}:</label>
          <input placeholder={Meal?.description} type="text" name="MealDescription" id="MealDescription" className='p-2 bg-[#F3F4F7] rounded w-full' />
        </div>
        {/*Meal Offer*/}
        <div className='flex flex-col justify-start items-start w-full gap-3 py-4'>
          <label htmlFor="MealOffer">{t('offer')}:</label>
          <input placeholder={Meal?.offer} type="text" name="MealOffer" id="MealOffer" className='p-2 bg-[#F3F4F7] rounded w-full' />
        </div>
        {/*Meal Price*/}
        <div className='flex flex-col justify-start items-start w-full gap-3 py-4'>
          <label htmlFor="MealPrice">{t('price')}:</label>
          <input placeholder={Meal?.price?.toString() || '0'} type="text" min={0} name="MealPrice" id="MealPrice" className='p-2 bg-[#F3F4F7] rounded w-full' />
        </div>
        {/*Meal Quantity*/}
        <div className='flex flex-col justify-start items-start w-full gap-3 py-4'>
          <label htmlFor="MealQuantity">{t('quantity')}:</label>
          <input placeholder={Meal?.quantity?.toString() || '0'} type="number" min={0} name="MealQuantity" id="MealQuantity" className='p-2 bg-[#F3F4F7] rounded w-full' />
        </div>
        {/*CategoryID*/}
        <div className='flex flex-col justify-start items-start w-full gap-3 py-4'>
          <label htmlFor="MealQuantity">{t('category')}:</label>
          <select name="CategoryId" defaultValue={Meal?.categoryId} className=' bg-[#F3F4F7] w-full  p-2 rounded '>
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
          EditMeal?.status === 201 && <p className="text-green-500">{t('success')}</p>
        }
        <div className='flex flex-col justify-start items-start w-full gap-3 py-4'>
          <button type="submit" id="MealDescription" className='p-2 border border-[#F3F4F7] text-white cursor-pointer bg-primary rounded w-full'>
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
