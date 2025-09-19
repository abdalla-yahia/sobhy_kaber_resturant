'use client'
import Image from "next/image";
import { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/Libs/Store/Store";
import { loggedUser } from "@/Features/Actions/AuthActions";
import { getUserById } from "@/Features/Actions/UsersActions";
import { useTranslations } from "next-intl";

export default function Personal_Data_Container() {
  const { LogedUser } = useAppSelector((state: RootState) => state.auth)
  const { user } = useAppSelector((state: RootState) => state.user)
  const t=useTranslations('dashboard.personaldata')
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(loggedUser())
  }, [dispatch])
  //Get Data Of User
  useEffect(() => {
    if (LogedUser?.user?.id)
      dispatch(getUserById(LogedUser?.user?.id as string))
  }, [LogedUser?.user?.id, dispatch])
  return (
    <div className="w-full p-5 ">

      {/*User Information*/}
      <div className="w-full p-5 flex flex-col justify-between items-start gap-2">
        {/*Image And Name*/}
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-2">
          {/*Image*/}
          <Image className="rounded-full" src={user?.user?.image || 'https://static.vecteezy.com/system/resources/previews/060/423/145/non_2x/business-avatar-icon-with-a-simple-clean-design-featuring-a-man-in-a-suit-suitable-for-online-profiles-or-websites-free-png.png'} alt="admin-image" width={220} height={220} />
          {/*Main Information*/}
          <div className="flex flex-col justify-between items-start">
            {/*Admin Name*/}
            <h1 className="text-xl font-[600]">{user?.user?.name}</h1>
            {/*Email*/}
            <h2 className="text-[12px] font-[600] text-gray-400">{user?.user?.email}</h2>
          </div>
        </div>
        {/*Admin Information*/}
        <div className="w-full flex flex-col justify-start items-start gap-6">
          {/*Phone*/}
          <div className="flex justify-center items-center gap-2">
            <h3 className="text-[14px] font-bold">{t('phone')} : </h3>
            <p className="text-[12px] text-gray-500">{user?.user?.phone}</p>
          </div>
          {/*Address*/}
          <div className="flex justify-center items-center gap-2">
            <h3 className="text-[14px] font-bold">{t('address')} : </h3>
            <p className="text-[12px] text-gray-500">{user?.user?.address}</p>
          </div>
          {/*Gender*/}
          <div className="flex justify-center items-center gap-2">
            <h3 className="text-[14px] font-bold">{t('gender')} : </h3>
            <p className="text-[12px] text-gray-500">
              {user?.user?.gender}
            </p>
          </div>
          {/*Login Date*/}
          <div className="flex justify-center items-center gap-2">
            <h3 className="text-[14px] font-bold">{t('logindate')} : </h3>
            <p className="text-[12px] text-gray-500">{new Date(user?.user?.createdAt as string).toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: '2-digit' })}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
