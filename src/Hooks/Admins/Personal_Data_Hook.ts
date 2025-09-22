'use client'
import { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/Libs/Store/Store";
import { loggedUser } from "@/Features/Actions/AuthActions";
import { getUserById } from "@/Features/Actions/UsersActions";
import { useTranslations } from "next-intl";

export default function Personal_Data_Hook() {
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

  return {user,t}
}
