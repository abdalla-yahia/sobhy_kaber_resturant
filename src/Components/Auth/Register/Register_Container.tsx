'use client'
import Link from "next/link";
import { useActionState, useState } from "react";
import { CreateUser } from "@/Interfaces/UserInterfaces";
import { CreateUserValidation } from "@/Validations/UserValidations";
import { toast } from "react-toastify";
import { RootState, useAppDispatch, useAppSelector } from "@/Libs/Store/Store";
import { createUser } from "@/Features/Actions/UsersActions";
import { useRouter } from "next/navigation";
import {FaRegEye,FaRegEyeSlash} from'react-icons/fa';
import {LuLoader} from'react-icons/lu';
import {IoMdCheckmark} from'react-icons/io';
import { useTranslations } from "next-intl";

export default function Register_Container() {
    const [isShow, setIsShow] = useState(false)
    const [checkPasswordValid, setCheckPasswordValid] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const { user, error, loading } = useAppSelector((state: RootState) => state.user)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const t = useTranslations('registerPage')
    //Form Handller Function
    const RegisterNewUser = (prevState: CreateUser, formData: FormData): CreateUser => {
        const FormState = {
            ...prevState,
            name: formData.get('UserName') as string,
            email: formData.get('UserEmail') as string,
            password: formData.get('UserPassword') as string,
            address: formData.get('UserAddress') as string,
            phone: formData.get('UserPhone') as string,
            gender: formData.get('UserGender') as string || undefined
        }
        //Check Validation Of Data 
        const Validation = CreateUserValidation.safeParse(FormState)
        if (!Validation?.success) {
            toast.warning(Validation?.error?.issues?.map(e => e.message).join(', '))
            return FormState as CreateUser;
        }
        //Check Matches Password
        if (ConfirmPassword !== FormState?.password) {
            toast.warn('Password Not Matches')
            return FormState as CreateUser;
        }
        //Dispatch Data
        dispatch(createUser(Validation?.data))
        return FormState as CreateUser
    }
    //Initial State
    const InitialState = {
        name: '',
        email: '',
        password: '',
        address: '',
        phone: '',
        gender: undefined
    }
    const [, ActionForm] = useActionState(RegisterNewUser, InitialState)
    //Redirect User To Login Page
    if (user?.user?.name) {
        router.replace('/login')
    }
    return (
        <div className='w-full md:w-[50%] flex flex-col justify-center items-center'>
            {/*Main Title*/}
            <h1 className="text-4xl text-primary my-[20px] font-[700]">{t('title')}</h1>
            <form action={ActionForm} className="w-[70%] p-4 shadow shadow-[#000000]/8 rounded flex flex-col justify-start items-start">
                {/*User Name*/}
                <div className="w-full rounded my-[15px]">
                    <label className="" htmlFor="UserName">{t('form.name')}:</label>
                    <input type="text" name="UserName" id="UserName" placeholder={t('form.name')} className="w-full mt-3 p-3 rounded border  border-[#DEDEDE] outline-none text-[#707070]" />
                </div >
                {/*User Email*/}
                <div className="w-full rounded my-[15px]">
                    <label className="" htmlFor="UserEmail">{t('form.email')}:</label>
                    <input type="email" name="UserEmail" id="UserEmail" placeholder={t('form.email')+" @"}className="w-full mt-3 p-3 rounded border  border-[#DEDEDE] outline-none text-[#707070]" />
                </div >
                {/*User Password*/}
                <label className="" htmlFor="UserPassword">{t('form.password')}:</label>
                <div className="w-full rounded flex justify-center items-center mt-3 p-3 border border-[#DEDEDE] text-[#707070] gap-2">
                    {
                        isShow ? (<FaRegEye onClick={() => setIsShow(!isShow)} className='text-xl cursor-pointer ' />) :
                            (<FaRegEyeSlash onClick={() => setIsShow(!isShow)} className='text-xl cursor-pointer ' />)
                    }
                    <input onChange={(e) => setCheckPasswordValid(e.target.value)} type={isShow ? 'text' : 'password'} name="UserPassword" id="UserPassword" placeholder={t('form.password')} className="w-full h-full outline-none border-none " />
                </div>
                {/*Check Valid Rols Password*/}
                <ul className="flex flex-col my-2">
                    <li className={`${/[A-Z]/.test(checkPasswordValid) ? 'text-green-500' : 'text-gray-500'} text-[10px] flex justify-start items-center`}> {/[A-Z]/.test(checkPasswordValid) && <IoMdCheckmark className='text-green-500 text-[10px]' />} {t('form.capital')}</li>
                    <li className={`${/[a-z]/.test(checkPasswordValid) ? 'text-green-500' : 'text-gray-500'} text-[10px] flex justify-start items-center`}> {/[a-z]/.test(checkPasswordValid) && <IoMdCheckmark className='text-green-500 text-[10px]' />} {t('form.small')}</li>
                    <li className={`${/[0-9]/.test(checkPasswordValid) ? 'text-green-500' : 'text-gray-500'} text-[10px] flex justify-start items-center`}> {/[0-9]/.test(checkPasswordValid) && <IoMdCheckmark className='text-green-500 text-[10px]' />} {t('form.number')}</li>
                    <li className={`${checkPasswordValid?.length >= 8 ? 'text-green-500' : 'text-gray-500'} text-[10px] flex justify-start items-center`}> {checkPasswordValid?.length >= 8 && <IoMdCheckmark className='text-green-500 text-[10px]' />} {t('form.count')}</li>
                </ul>
                <p></p>
                {/*Confirm Password*/}
                <label className="mt-3" htmlFor="ConfirmPassword">{t('form.confirm')}:</label>
                <div className="w-full rounded flex justify-center items-center mt-3 p-3 border border-[#DEDEDE] text-[#707070] gap-2">
                    {
                        isShow ? (<FaRegEye onClick={() => setIsShow(!isShow)} className='text-xl cursor-pointer ' />) :
                            (<FaRegEyeSlash onClick={() => setIsShow(!isShow)} className='text-xl cursor-pointer ' />)
                    }
                    <input onChange={(e) => setConfirmPassword(e.target.value)} type={isShow ? 'text' : 'password'} name="ConfirmPassword" id="ConfirmPassword" placeholder={t('form.confirm')} className="w-full h-full outline-none border-none " />
                </div>
                {/*User Phone*/}
                <div className='w-full rounded my-[15px]'>
                    <label htmlFor="UserPhone">{t('form.phone')}:</label>
                    <input type="phone" name="UserPhone" id="UserPhone" placeholder={t('form.phone')} className='w-full mt-3 p-3 rounded border  border-[#DEDEDE] outline-none text-[#707070]' />
                </div>
                {/*User Address*/}
                <div className="w-full rounded my-[15px]">
                    <label className="" htmlFor="UserAddress">{t('form.address')}:</label>
                    <input type="text" name="UserAddress" id="UserAddress" placeholder={t('form.address')} className="w-full mt-3 p-3 rounded border  border-[#DEDEDE] outline-none text-[#707070]" />
                </div >
                {/*User Gender*/}
                <label className="" htmlFor="UserGender">{t('form.gender')}:</label>
                <div className="w-full my-[15px] flex justify-start items-center rounded border  border-[#DEDEDE]">
                    <select name="UserGender" defaultValue='' id="UserGender" className="w-full mt-3 px-3 py-2 outline-none text-[#707070]">
                        <option value='' disabled>{t('form.selectgender')}</option>
                        <option value="MALE">{t('form.male')}</option>
                        <option value="FEMAL">{t('form.female')}</option>
                    </select>
                </div >
                {/*State Of Action*/}
                {
                    user?.user?.name && <p className="text-green-500">{t('success')} ✓</p>
                }
                {
                    error && <p className="text-red-500">{t('faild')}  &#88; {error}</p>
                }
                {/*Submite Button*/}
                <button type="submit" value="" className='bg-primary my-[15px] text-xl text-white cursor-pointer p-2 w-full rounded' >
                    {loading ? (
                        <>
                            <div className="w-full flex justify-center items-center gap-2">
                                <LuLoader className="h-4 w-4 animate-spin" />
                                {t('form.register')}...
                            </div>
                        </>
                    )

                        : `${t('form.register')}`}
                </button>
            </form>
            {/* Account Links */}
            <div className="flex flex-col w-[70%] my-[15px] gap-3">
                <p className="text-[14px] text-black/50">
                    {t('have')}?{" "}
                    <Link href="/login" className="text-primary hover:underline">
                        {t('login')}
                    </Link>
                </p>
            </div>
        </div>
    )
}
