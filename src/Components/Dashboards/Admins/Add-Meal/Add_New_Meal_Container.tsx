'use client'
import UploadImages from "@/Utils/UploadImage";
import { SetStateAction, useActionState, useEffect, useState } from "react";
import * as icon from '@/Utils/Icons';
import { RootState, useAppDispatch, useAppSelector } from "@/Libs/Store/Store";
import { CreateMeal } from "@/Interfaces/MealInterface";
import { CreateMealValidation } from "@/Validations/MealValidation";
import { toast } from "react-toastify";
import { createMeal } from "@/Features/Actions/MealsActions";
import { UpdateCategory } from "@/Interfaces/CategoryInterface";
import { useTranslations } from "next-intl";

export default function Add_New_Meal_Container() {
  const [imageUrl, setImages] = useState<string[]>([]);
  const { Meal, error, loading } = useAppSelector((state: RootState) => state.meals)
  const { AllCategories } = useAppSelector((state: RootState) => state.category)
  const t= useTranslations('dashboard.addnewmeal')
  const dispatch = useAppDispatch()
  //Create Item Handler
  const CreateItem = (prevState: CreateMeal, formData: FormData): CreateMeal => {
    const formstate = {
      ...prevState,
      title: formData.get('MealTitle') as string,
      description: formData.get('MealDescription') as string,
      offer: formData.get('MealOffer') as string,
      price: Number(formData.get('MealPrice')),
      quantity: Number(formData.get('MealQuantity')),
      categoryId: formData.get('CategoryId') as string,
      image: imageUrl && imageUrl[0],
      gallery: imageUrl as string[]
    }
    //Check Validation 
    const Validation = CreateMealValidation.safeParse(formstate)
    if (!Validation?.success) {
      toast.warning(Validation?.error?.issues?.map(e => e?.message)?.join(', '))
      return formstate;
    }
    //Send Data 
    dispatch(createMeal(Validation?.data))
    return formstate
  }
  //Initial State
  const InitialState = {
    title: '',
    description: '',
    offer: '',
    image: '',
    slug: "",
    price: 0,
    quantity: 1,
    oldPrice: 0,
    categoryId: '',
    brandId: '',
    gallery: []
  }

  const [, ActionStat] = useActionState(CreateItem, InitialState)
  //Rest Image Galary
  useEffect(() => {
    if (Meal?.status === 201) {
      window?.location.reload()
    }
  }, [Meal?.status])
  return (
    <div className="w-full flex flex-col justify-start items-center gap-5 p-8">
      {/*Section Title*/}
      <h1 className="text-2xl font-[600] gap-2 mb-5 text-primary mr-auto flex justify-center items center">
        {/* Icon */}
        <icon.IoPricetagsSharp />
        {t('header')}
      </h1>
      {/*Form */}
      <form action={ActionStat} className="w-full md:w-[70%]">
        {/*Meal Image*/}
        <UploadImages images={imageUrl} setImages={setImages as (urls: string[]) => SetStateAction<string[]>} />
        {/*Meal Image URL*/}
        <div className='flex flex-col justify-start items-start w-full gap-3 py-4'>
          <label htmlFor="MealUrl">{t('image')}:</label>
          <input onChange={(e) => setImages([e.target.value])} type="text" name="MealUrl" id="MealUrl" className='p-2 bg-[#F3F4F7] rounded w-full border' />
        </div>
        {/*Meal Title*/}
        <div className='flex flex-col justify-start items-start w-full gap-3 py-4'>
          <label htmlFor="MealTitle">{t('title')}:</label>
          <input type="text" name="MealTitle" id="MealTitle" className='p-2 bg-[#F3F4F7] rounded w-full border' />
        </div>
        {/*Meal Description*/}
        <div className='flex flex-col justify-start items-start w-full gap-3 py-4'>
          <label htmlFor="MealDescription">{t('description')}:</label>
          <input type="text" name="MealDescription" id="MealDescription" className='p-2 bg-[#F3F4F7] rounded w-full border' />
        </div>
        {/*Meal Offer*/}
        <div className='flex flex-col justify-start items-start w-full gap-3 py-4'>
          <label htmlFor="MealOffer">{t('offer')}:</label>
          <input type="text" name="MealOffer" id="MealOffer" className='p-2 bg-[#F3F4F7] rounded w-full border' />
        </div>
        {/*Meal Price*/}
        <div className='flex flex-col justify-start items-start w-full gap-3 py-4'>
          <label htmlFor="MealPrice">{t('price')}:</label>
          <input type="text" min={0} name="MealPrice" id="MealPrice" className='p-2 bg-[#F3F4F7] rounded w-full border' />
        </div>
        {/*Meal Quantity*/}
        <div className='flex flex-col justify-start items-start w-full gap-3 py-4'>
          <label htmlFor="MealQuantity">{t('quantity')}:</label>
          <input type="number" min={0} name="MealQuantity" id="MealQuantity" className='p-2 bg-[#F3F4F7] rounded w-full border' />
        </div>
        {/*CategoryID*/}
        <div className='flex flex-col justify-start items-start w-full gap-3 py-4'>
          <label htmlFor="MealQuantity">{t('category')}:</label>
          <select name="CategoryId" className=' bg-[#F3F4F7] w-full  p-2 rounded border'>
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
          Meal?.Meal?.title && <p className="text-green-500">{t('success')}</p>
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
