'use client'
import Image from "next/image";
import {Link, usePathname, useRouter} from '@/i18n/navigation';
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import Login_User from "./Login_User";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import styles from './style.module.css';
import { RootState, useAppDispatch, useAppSelector } from "@/Libs/Store/Store";
import { getAllLanguagies } from "@/Features/Actions/LanguageActions";

export default function Header_Container({currentLocale}: {currentLocale: string}) {
  const {AllLanguages} = useAppSelector((state:RootState)=>state.language)
  const [language,setLanguage] = useState(currentLocale)
  const [flag,setFlag] = useState('')
  const [toggle,setToggle] = useState(false)
  const [toggleMenuLink,setToggleMenuLink] = useState(false)
  const t = useTranslations('header')
  const dropDownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const dispatch = useAppDispatch()
  //Get All Locale Existes
  useEffect(()=>{
    dispatch(getAllLanguagies())
  },[dispatch])
  //Close DropDown If User Click On Body
  useEffect(()=>{
    function ClickOutSideDropDownHandler(e: MouseEvent) {
      if (!dropDownRef?.current?.contains(e.target as Node)) {
        setToggle(false);
      }
    }
    window.addEventListener("click", ClickOutSideDropDownHandler);
    return () => window.removeEventListener("click", ClickOutSideDropDownHandler);
  },[])
  //Change PathName After Select Language
  useEffect(()=>{
    router.replace(pathname, {locale: language});
  },[language])
  //Set Flag Of Country
  useEffect(()=>{
    switch(currentLocale){
        case "ar":
        setFlag('https://static.vecteezy.com/system/resources/previews/001/952/861/non_2x/egypt-flag-isolate-banner-print-illustration-eps-vector.jpg')
         break;
        case "en":
        setFlag('https://static.vecteezy.com/system/resources/previews/002/417/819/non_2x/illustration-of-the-united-kingdom-flag-free-vector.jpg')
         break;
        case "fr":
        setFlag('https://static.vecteezy.com/system/resources/previews/004/313/578/non_2x/france-country-flag-free-vector.jpg')
         break;
        case "sp":
        setFlag('https://static.vecteezy.com/system/resources/previews/009/767/106/non_2x/spain-flag-flag-of-spain-illustration-free-vector.jpg')
         break;
        case "it":
        setFlag('https://static.vecteezy.com/system/resources/previews/002/417/790/non_2x/vectorial-illustration-of-the-italian-flag-free-vector.jpg')
         break;
        case "zh":
        setFlag('https://static.vecteezy.com/system/resources/previews/002/133/523/non_2x/chinese-flag-official-chinese-flag-with-original-color-and-size-proportion-free-vector.jpg')
         break;
        default:
        setFlag('https://static.vecteezy.com/system/resources/previews/001/952/861/non_2x/egypt-flag-isolate-banner-print-illustration-eps-vector.jpg')

    }
  },[currentLocale])
  return (
    <header className=" w-full flex justify-center items-center z-50 top-0 left-0 text-primary bg-secondary relative">
      <div className="container w-full bg-inherit">
        {/*Logo && Locale*/}
        <div className="flex z-50 gap-4 bg-inherit justify-center items-center">
            {/*Logo*/}
            <Link href='/'>
              <Image priority src={'/Images/Logo.png'} className=" drop-shadow-xl" alt="logo" width={220} height={100}/>
            </Link>
            {/*List Of Locale*/}
            <div ref={dropDownRef} onClick={()=>setToggle(!toggle)} className="relative bg-inherit cursor-pointer flex flex-col justify-center items-center gap-1 w-full">
              <p className="border uppercase p-1 flex justify-between items-center gap-1">{language === 'ar'?'ع':language}
              <Image  src={flag} alt={`flag-${language}`} width={20} height={20}/>
              </p>
              {toggle && <div  className="flex w-full  flex-col justify-between items-center gap-2 absolute top-[200%] left-[50%] -translate-x-[50%] bg-inherit">
                {
                  AllLanguages?.Language?.map((lang)=>
                  <span key={lang?.id} onClick={()=>{setLanguage(lang?.code as string);setToggle(false)}} className="hover:bg-primary hover:text-secondary px-3 cursor-pointer uppercase flex justify-between items-center gap-1 w-full">
                    {lang?.name}
                  <Image  src={lang?.flage} alt={`flag-${lang?.code}`} width={20} height={20}/>
                  </span>
                  
                  )
                }
              </div>}
            </div>
        </div>
        {/*Login && NavList*/}
        <div className="w-full flex bg-inherit gap-4 justify-between items-center ">
          {/*Nav List*/}
          <nav style={{
            clipPath:toggleMenuLink && 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'||''
          }} className={`${styles.navLinkswrapper} w-full`}>
            <ul className="w-full flex  flex-col md:flex-row justify-center items-center gap-2 px-2 ">
              {/* <li className="hover:bg-secondary hover:text-white duration-100 p-2 rounded-full cursor-pointer font-[600]"><Link href="/order" >{t('order')}</Link></li> */}
              <li className="hover:bg-secondary hover:text-white duration-100 p-2 rounded-full cursor-pointer font-[600]"><Link onClick={()=>setToggleMenuLink(false)} href="/" >{t('home')}</Link></li>
              <li className="hover:bg-secondary hover:text-white duration-100 p-2 rounded-full cursor-pointer font-[600]"><Link onClick={()=>setToggleMenuLink(false)} href="/menu" >{t('menue')}</Link></li>
              <li className="hover:bg-secondary hover:text-white duration-100 p-2 rounded-full cursor-pointer font-[600]"><Link onClick={()=>setToggleMenuLink(false)} href="/about" >{t('about')}</Link></li>
              <li className="hover:bg-secondary hover:text-white duration-100 p-2 rounded-full cursor-pointer font-[600]"><Link onClick={()=>setToggleMenuLink(false)} href="/contact" >{t('contact')}</Link></li>
            </ul>
          </nav>
          {/*Login*/}
          <Login_User />
          {/*Toogle button*/}
            {
              toggleMenuLink ? (
                <IoMdClose onClick={()=>setToggleMenuLink(!toggleMenuLink)} className="text-3xl font-bold transition-all duration-700 cursor-pointer block md:hidden "/>
              ):
              (
                <CiMenuBurger onClick={()=>setToggleMenuLink(!toggleMenuLink)} className="text-3xl font-bold transition-all duration-700 cursor-pointer block md:hidden "/>
              )
            }
        </div>
      </div>
    </header>
  )
}


