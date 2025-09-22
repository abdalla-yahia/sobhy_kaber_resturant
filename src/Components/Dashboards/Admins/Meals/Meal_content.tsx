'use client'
import Image from "next/image";
import { UpdateMeal } from "@/Interfaces/MealInterface";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function Meal_content({ Meal }: { Meal: UpdateMeal }) {
  const locale = useLocale()
  const title = Meal?.translations?.find(t=>t.LocalId === locale)?.name
  const CategoryTranslateTitle = Meal?.category?.translations?.find(t=>t.LocalId === locale)?.name

  return (
    <>
      <tr key={Meal?.id}>
        <td className="p-2 border border-[#E4E5EE] flex justify-center items-center">
          <Link href={`/Meals/${Meal?.slug}`}>
            <Image src={Meal?.image as string} alt={Meal?.title as string} width={40} height={0} />
          </Link>
        </td>
        <td className="p-2 border border-[#E4E5EE]">
          <Link href={`/Meals/${Meal?.slug}`}>
            {title ? title: Meal?.title}
          </Link>
        </td>
        <td className="p-2 border border-[#E4E5EE]">{Meal?.description}</td>
        <td className="p-2 border border-[#E4E5EE]">
          <Link href={`/Meals/categories/${Meal?.category?.id}`}>
            {CategoryTranslateTitle ?  CategoryTranslateTitle : Meal?.category?.title}
          </Link>
        </td>
        <td className="p-2 border border-[#E4E5EE]">{Meal?.quantity}</td>
        <td className="p-2 border border-[#E4E5EE]">{Meal?.price}</td>
        <td className="p-2 border border-[#E4E5EE]">{Meal?.offer}</td>

      </tr>
    </>
  )
}
