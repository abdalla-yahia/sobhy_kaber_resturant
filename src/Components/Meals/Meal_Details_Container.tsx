'use client'
import { getMealBySlug } from "@/Features/Actions/MealsActions"
import { RootState, useAppDispatch, useAppSelector } from "@/Libs/Store/Store"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import { useEffect } from "react"

export default function Meal_Details_Container({slug}:{slug:string}) {
    const {Meal} = useAppSelector((state:RootState)=>state.meals)
    const dispatch = useAppDispatch()
    useEffect(()=>{
        dispatch(getMealBySlug(slug))
    },[])
    const locale = useLocale()
    const title = Meal?.Meal?.translations?.find(t=>t.LocalId === locale)?.name
    const t= useTranslations('mealDetails')
  return (
    <section className="parent flex-col mt-[180px]">
        <h1 className="text-5xl font-bold">{title ? title : Meal?.Meal?.title}</h1>
        <div className="w-[90%] flex justify-start items-center gap-8">
            {/*Image*/}
            {Meal?.Meal?.image && <Image src={Meal?.Meal?.image} alt={Meal?.Meal?.title as string} width={250} height={250}/>}
            <div className="flex flex-col gap-4 justify-between items-start">
                {/*Price*/}
                <div className="flex justify-between items-center">
                   <h3>{t('price')} :</h3>   
                   <p>{Meal?.Meal?.price} L.E</p>   
                </div>
                {/*quantity*/}
                <div className="flex justify-between items-center">
                   <h3>{t('quantity')} :</h3>   
                   <p>{Meal?.Meal?.quantity} </p>   
                </div>
                {/*Calories*/}
                <div className="flex justify-between items-center">
                   <h3>{t('Calories')} :</h3>   
                   <p>450 {t('Calories')}</p>   
                </div>
            </div>
        </div>
    </section>
  )
}
