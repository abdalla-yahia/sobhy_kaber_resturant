'use client'
import { loggedUser, logoutUser } from '@/Features/Actions/AuthActions';
import { RootState, useAppDispatch,useAppSelector } from '@/Libs/Store/Store';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function Login_Hook() {
     const { LogedUser } = useAppSelector((state: RootState) => state.auth)
      const dispatch = useAppDispatch()
      const router = useRouter()
      const t = useTranslations('logoutpage')
      // Get Logged in User After Loading Page
      useEffect(() => {
        dispatch(loggedUser())
      }, [dispatch])
    
      // Logout handler
      const LogoutUserHandler = async () => {
        await dispatch(logoutUser()).unwrap()
        router.replace("/") 
      }
    
      // Go To Home Page After Login || Logout
      useEffect(() => {
        if (LogedUser?.status == 200) {
          router.replace("/")
        }
        if (LogedUser?.status == 201) {
          router.replace("/")
          window.location.reload()
        }
    
      }, [LogedUser, router])

  return {LogedUser,LogoutUserHandler,t}
}
