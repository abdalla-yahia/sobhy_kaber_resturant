'use client'
import Image from "next/image";
import {Link} from '@/i18n/navigation';
import Login_User from "./Login_User";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import styles from './style.module.css';
import HeaderHook from "@/Hooks/Header/Header_Hook";

export default function Header_Container({currentLocale}: {currentLocale: string}) {
  const  {language,AllLanguages,setLanguage,flag,setToggle,toggle,setToggleMenuLink,toggleMenuLink,t,dropDownRef} = HeaderHook({currentLocale})
  
  return (
    <header className="header  fixed top-0 min-h-[100px] left-0 w-full flex justify-center items-center z-50 text-primary ">
      <div className="md:w-[95%] bg-inherit flex justify-between items-center px-2 gap-3">
        {/*Logo && Locale*/}
        <div className="flex w-[50%] z-50 gap-0 bg-inherit justify-start items-center">
            {/*Logo*/}
            <Link href='/' className="">
              <Image priority src={'/Images/Logo.png'} className=" drop-shadow-xl" alt="logo" width={180} height={100}/>
            </Link>
            {/*List Of Locale*/}
            <div ref={dropDownRef}  onClick={()=>setToggle(!toggle)} className="relative flex-shrink-0 bg-inherit cursor-pointer flex flex-col justify-center items-center gap-1 w-fit">
              <p className="border uppercase p-1 flex justify-between items-center gap-1">{language === 'ar'?'ع':language}
              <Image loading="lazy" src={flag||'https://static.vecteezy.com/system/resources/previews/001/952/861/non_2x/egypt-flag-isolate-banner-print-illustration-eps-vector.jpg'} alt={`flag-${language}`} width={20} height={20}/>
              </p>
              {toggle && <div  className="flex w-full  flex-col justify-between items-center gap-2 absolute top-[200%] left-[50%] -translate-x-[50%] bg-inherit">
                {
                  AllLanguages?.Language?.map((lang)=>
                  <span key={lang?.id} onClick={()=>{setLanguage(lang?.code as string);setToggle(false)}} className="hover:bg-primary line-clamp-1 hover:text-secondary px-1 cursor-pointer uppercase flex justify-between items-center gap-1 w-full">
                    {lang?.code}
                  <Image  src={lang?.flage} alt={`flag-${lang?.code}`} width={20} height={20}/>
                  </span>
                  
                  )
                }
              </div>}
            </div>
        </div>
        {/*Login && NavList*/}
        <div className="w-[50%] bg-inherit flex gap-0 md:gap-4 justify-center md:justify-between items-center ">
          {/*Nav List*/}
          <nav  style={{
            clipPath:toggleMenuLink && 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'||''
          }} className={`${styles.navLinkswrapper} w-[95%]`}>
            <ul className="w-full flex  flex-col md:flex-row justify-center items-center gap-2 px-2 ">
              <li className="hover:bg-secondary hover:text-white duration-100 p-2 rounded-full cursor-pointer font-[600]"><Link onClick={()=>setToggleMenuLink(false)} href="/" >{t('home')}</Link></li>
              <li className="hover:bg-secondary hover:text-white duration-100 p-2 rounded-full cursor-pointer font-[600]"><Link onClick={()=>setToggleMenuLink(false)} href="/menu" >{t('menue')}</Link></li>
              <li className="hover:bg-secondary hover:text-white duration-100 p-2 rounded-full cursor-pointer font-[600]"><Link onClick={()=>setToggleMenuLink(false)} href="/about" >{t('about')}</Link></li>
              <li className="hover:bg-secondary hover:text-white duration-100 p-2 rounded-full cursor-pointer font-[600]"><Link onClick={()=>setToggleMenuLink(false)} href="/contact" >{t('contact')}</Link></li>
            </ul>
          </nav>
          {/*Login*/}
          <Login_User />
          {/*Toogle button*/}
          <div>
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
      </div>
    </header>
  )
}


