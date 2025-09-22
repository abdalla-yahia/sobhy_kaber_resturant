'use client'
import {FaRegEye,FaRegEyeSlash} from'react-icons/fa';
import {LuLoader} from'react-icons/lu';
import Link from "next/link";
import Login_Hook from '@/Hooks/Auth/Login_Hook';

export default function Login_Container() {
   const {ActionState,isShow,setIsShow,LogedUser,error,loading,t} = Login_Hook();
   
    return (
        <div className='w-full md:w-[50%] flex flex-col justify-center items-center'>
            {/*Main Title*/}
            <h1 className="text-4xl text-primary my-[20px] font-[700]">{t('title')}</h1>
            <form action={ActionState} className="w-[70%] p-4 shadow shadow-[#000000]/8 rounded flex flex-col justify-start items-start">
                {/*User Email*/}
                <div className="w-full rounded my-[15px]">
                    <label className="" htmlFor="UserEmail">{t('form.email')}:</label>
                    <input type="email" name="UserEmail" id="UserEmail" placeholder={`${t('form.email')} @`} className="w-full mt-3 p-3 rounded border  border-[#DEDEDE] outline-none text-[#707070]" />
                </div >
                {/*User Password*/}
                <label className="" htmlFor="UserPassword">{t('form.password')}:</label>
                <div className="w-full rounded flex justify-center items-center mt-3 p-3 border border-[#DEDEDE] text-[#707070] gap-2">
                    {
                        isShow ? (<FaRegEye onClick={() => setIsShow(!isShow)} className='text-xl cursor-pointer ' />) :
                            (<FaRegEyeSlash onClick={() => setIsShow(!isShow)} className='text-xl cursor-pointer ' />)
                    }
                    <input type={isShow ? 'text' : 'password'} name="UserPassword" id="UserPassword" placeholder={`${t('form.password')}`} className="w-full h-full outline-none border-none " />
                </div>
                {/*Submite Button*/}
                {
                    LogedUser?.user?.name && <p className="text-green-500">{t('user')} {LogedUser?.user?.name} {t('success')}</p>
                }
                {
                    error && <p className="text-red-500">{t('faild')}</p>
                }
                <button type="submit" value="" className='bg-primary my-[15px] text-xl text-white cursor-pointer p-2 w-full rounded' >
                    {loading ?
                        (
                            <>
                                <div className="w-full flex justify-center items-center gap-2">
                                    <LuLoader className="h-4 w-4 animate-spin" />
                                    {t('form.login')}...
                                </div>
                            </>
                        ) : `${t('form.login')}`}
                </button>
            </form>
            {/* Account Links */}
            <div className="flex flex-col w-[70%] my-[15px] gap-3">
                <p className="text-[14px] text-black/50">
                    {t('dont')}{" "}
                    <Link href="/register" className="text-red-500 hover:underline">
                        {t('register')}
                    </Link>
                </p>
          
            </div>
        </div>
    )
}
