import Login_Hook from '@/Hooks/Header/Login_Hook';
import Image from 'next/image';
import Link from 'next/link';
import {CiSettings} from 'react-icons/ci';
import {IoPersonCircleOutline} from 'react-icons/io5';

export default function Login_User() {
  const {LogedUser,LogoutUserHandler,t} = Login_Hook()

  return (
    <div className="mr-auto login-icon cursor-pointer w-fit">
      {/*Icon*/}
      {
        LogedUser?.user?.name ?
          (
            <div className='flex justify-between md:justify-center items-center gap-0'>
              <div className='flex w-full md:flex-col justify-center items-center gap-1'>
                <Image className=' hidden md:block' src={LogedUser?.user?.image || 'https://static.vecteezy.com/system/resources/previews/060/423/145/non_2x/business-avatar-icon-with-a-simple-clean-design-featuring-a-man-in-a-suit-suitable-for-online-profiles-or-websites-free-png.png'} alt='user-image' width={50} height={50} />
                <span >{LogedUser?.user?.name.split(' ')[0]}</span>
                <button onClick={() => LogoutUserHandler()} className='order-1 md:order-3 p-1 bg-primary text-white rounded cursor-pointer'>{t('logout')}</button>
              </div>
             {LogedUser?.user?.role === 'ADMIN' && <Link className='flex flex-col mx-[15px] justify-center items-center gap-1 text-center' href={LogedUser?.user?.role === 'ADMIN' ? '/dashboard/admins' : '/dashboard/users'}>
                <CiSettings className='text-[25px] hidden md:block' />
                  <span className='hidden md:block uppercase text-[10px] font-[600] text-center w-[100%]'>{t('dashboard')}</span> 
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
