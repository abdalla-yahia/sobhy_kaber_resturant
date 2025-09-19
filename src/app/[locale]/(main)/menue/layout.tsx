'use client'
import { getAllCategories } from "@/Features/Actions/CategoriesActions"
import { useAppDispatch } from "@/Libs/Store/Store"
import { useEffect } from "react"


export default function MenuLayout({children}:{children: React.ReactNode}){
    const dispatch = useAppDispatch()
    useEffect(()=>{
        dispatch(getAllCategories())
    },[])
    return(
        <>
        {children}
        </>
    )
}