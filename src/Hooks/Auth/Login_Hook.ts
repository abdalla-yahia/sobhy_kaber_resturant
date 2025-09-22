'use client'
import { useActionState, useState } from "react"
import { RootState, useAppDispatch, useAppSelector } from "@/Libs/Store/Store";
import { CreateUserValidation } from "@/Validations/UserValidations";
import { toast } from "react-toastify";
import { loginUser } from "@/Features/Actions/AuthActions";
import { UserLogineInterface } from "@/Interfaces/UserInterfaces";
import { useTranslations } from "next-intl";

export default function Login_Hook() {
     const { LogedUser, error, loading } = useAppSelector((state: RootState) => state.auth)
        const dispatch = useAppDispatch()
        const [isShow, setIsShow] = useState(false)
        const t = useTranslations('loginPage')
        //Form Login 
        const UserLogin = (prevState: UserLogineInterface, formData: FormData): UserLogineInterface => {
            const formState = {
                ...prevState,
                email: formData.get('UserEmail') as string,
                password: formData.get('UserPassword') as string
            }
            //Check Validation 
            const PickData = CreateUserValidation?.pick({ email: true, password: true })
            const Validation = PickData?.safeParse(formState)
    
            if (!Validation?.success) {
                toast.warning(Validation?.error?.issues?.map(e => e.message).join(', '))
                return formState;
            }
            // Dispatch Data
            dispatch(loginUser(Validation?.data))
            return formState
        }
        const InitalState = {
            email: '',
            password: ''
        }
        const [, ActionState] = useActionState(UserLogin, InitalState)
    
  return {ActionState,isShow,setIsShow,LogedUser,error,loading,t}
}
