'use client'
import Aside_Dashboard from "@/Components/Dashboards/Aside/Aside_Dashboard";
import { getAllCategories } from "@/Features/Actions/CategoriesActions";
import { getAllMeal} from "@/Features/Actions/MealsActions";
import { getAllUsers } from "@/Features/Actions/UsersActions";
import { RootState, useAppDispatch, useAppSelector } from "@/Libs/Store/Store";
import { useEffect } from "react";
import { getAllLanguagies } from "@/Features/Actions/LanguageActions";
import { getAllTranslateCategory } from "@/Features/Actions/TranslateCategoryActions";

export default function AdminsLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    const { user } = useAppSelector((state: RootState) => state.user)
    const { category } = useAppSelector((state: RootState) => state.category)
    const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllCategories())
    dispatch(getAllUsers())
    dispatch(getAllLanguagies())
    dispatch(getAllTranslateCategory())
    dispatch(getAllMeal())
  }, [dispatch,user,category])

  return (
    <section className="w-full flex justify-center items-center mt-[40px]">
      <div className="w-[90%] flex justify-between items-start gap-5">
        {/*Aside Buttons*/}
        <Aside_Dashboard role={'admins'} />
        {/*Page Content*/}
        <div className="w-[80%] flex flex-col justify-start items-start  text-[#3E445A] font-[400] text-sm gap-0 border border-[#E4E5EE] p-4 rounded">
          {children}
        </div>
      </div>
    </section>
  );
}
