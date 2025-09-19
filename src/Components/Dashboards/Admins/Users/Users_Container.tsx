'use client'
import { UpdateUser } from "@/Interfaces/UserInterfaces"
import { RootState, useAppSelector } from "@/Libs/Store/Store"
import User_Content from "./User_Content"
import * as icon from '@/Utils/Icons'
import { useTranslations } from "next-intl"

export default function Users_Container() {
  const { AllUsers } = useAppSelector((state: RootState) => state.user)
  const t= useTranslations('dashboard.users')
  return (
    <div className="w-full overflow-x-auto scrollbar-none flex flex-col justify-start items-start relative">
      {/*Section Title*/}
      <h1 className="text-xl font-bold my-4 text-primary flex justify-between items-center">
        <icon.FaUsers className="text-3xl mx-2" />
        {t('allusers')} {`(${AllUsers?.users?.length})`}
      </h1>
      {/*Users Table*/}
      <table className="w-full border border-gray-200 text-center">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border border-[#E4E5EE] capitalize">{t('image')}</th>
            <th className="p-2 border border-[#E4E5EE] capitalize">{t('name')}</th>
            <th className="p-2 border border-[#E4E5EE] capitalize">{t('gender')}</th>
            <th className="p-2 border border-[#E4E5EE] capitalize">{t('email')}</th>
            <th className="p-2 border border-[#E4E5EE] capitalize">{t('phone')}</th>
            <th className="p-2 border border-[#E4E5EE] capitalize">{t('address')}</th>
            <th className="p-2 border border-[#E4E5EE] capitalize">{t('role')}</th>
          </tr>
        </thead>
        <tbody>
          {
            AllUsers?.users?.map((User: UpdateUser) =>
              <User_Content key={User?.id} User={User} />
            )
          }
        </tbody>
      </table>

    </div>
  )
}
