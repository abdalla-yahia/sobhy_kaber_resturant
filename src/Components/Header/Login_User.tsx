'use client'
import { loggedUser, logoutUser } from '@/Features/Actions/AuthActions';
import { RootState, useAppDispatch,useAppSelector } from '@/Libs/Store/Store';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {CiSettings} from 'react-icons/ci';
import {IoPersonCircleOutline} from 'react-icons/io5';
import { useTranslations } from 'next-intl';

export default function Login_User() {
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

  return (
    <div className="mr-auto login-icon cursor-pointer w-fit">
      {/*Icon*/}
      {
        LogedUser?.user?.name ?
          (
            <div className='flex justify-between md:justify-center items-center gap-4'>
              <div className='flex w-full md:flex-col justify-center items-center gap-2'>
                <Image src={LogedUser?.user?.image || 'https://static.vecteezy.com/system/resources/previews/060/423/145/non_2x/business-avatar-icon-with-a-simple-clean-design-featuring-a-man-in-a-suit-suitable-for-online-profiles-or-websites-free-png.png'} alt='user-image' width={50} height={50} />
                <span >{LogedUser?.user?.name.split(' ')[0]}</span>
                <button onClick={() => LogoutUserHandler()} className='order-1 md:order-3 p-1 bg-primary text-white rounded cursor-pointer'>{t('logout')}</button>
              </div>
             {LogedUser?.user?.role === 'ADMIN' && <Link className='flex flex-col mx-[15px] justify-center items-center gap-1 text-center' href={LogedUser?.user?.role === 'ADMIN' ? '/dashboard/admins' : '/dashboard/users'}>
                <CiSettings className='text-[25px]' />
                  <span className='hidden md:block uppercase text-[10px] font-[600] text-center w-[100%]'>{t('dashboard')}</span> 
                {/* <span className=' uppercase text-[10px] text-center w-[50%]'> {t('admin')} */}
                  {/* </span> */}
              </Link>}
            </div>

          )
          :
          <Link href={'/login'} className='cursor-pointer'>
            <IoPersonCircleOutline className='text-[30px] text-primary' />
          </Link>
      }
    </div>
  )
}
