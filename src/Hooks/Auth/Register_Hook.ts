'use client'
import { useActionState, useState } from "react";
import { CreateUser } from "@/Interfaces/UserInterfaces";
import { CreateUserValidation } from "@/Validations/UserValidations";
import { toast } from "react-toastify";
import { RootState, useAppDispatch, useAppSelector } from "@/Libs/Store/Store";
import { createUser } from "@/Features/Actions/UsersActions";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Register_Hook() {
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
  return {ActionForm,t,isShow,setIsShow,setCheckPasswordValid,checkPasswordValid,setConfirmPassword,user,error,loading}
}
