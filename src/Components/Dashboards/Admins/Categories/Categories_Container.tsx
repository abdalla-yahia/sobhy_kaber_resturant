'use client'
import { UpdateCategory } from "@/Interfaces/CategoryInterface"
import { RootState, useAppSelector } from "@/Libs/Store/Store"
import Category_Content from "./Category_Content"
import * as icon from '@/Utils/Icons'
import { useTranslations } from "next-intl"

export default function Categories_Container() {
  const { AllCategories } = useAppSelector((state: RootState) => state.category)
  const t = useTranslations('dashboard.categories')
  return (
    <div className="w-full overflow-x-auto scrollbar-none flex flex-col justify-start items-start relative">
      {/*Section Title*/}
      <h1 className="text-xl font-bold my-4 text-primary flex justify-between items-center">
        <icon.MdCategory className="text-3xl mx-2" />
       {t('allcategories')} {`(${AllCategories?.categories?.length})`}
      </h1>
      {/*Categories Table*/}
      <table className="w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border border-[#E4E5EE]">{t('image')}</th>
            <th className="p-2 border border-[#E4E5EE]">{t('title')}</th>
            <th className="p-2 border border-[#E4E5EE]">{t('description')}</th>
            <th className="p-2 border border-[#E4E5EE]">{t('action')}</th>
          </tr>
        </thead>
        <tbody>
          {
            AllCategories?.categories?.map((Category: UpdateCategory) =>
              <Category_Content key={Category?.id} Category={Category} />
            )
          }
        </tbody>
      </table>

    </div>
  )
}
