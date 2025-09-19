'use client'
import Image from "next/image";
import {Link, usePathname, useRouter} from '@/i18n/navigation';
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import Login_User from "./Login_User";

export default function Header_Container({currentLocale}: {currentLocale: string}) {
  const [language,setLanguage] = useState(currentLocale)
  const [flag,setFlag] = useState('')
  const [toggle,setToggle] = useState(false)
  const t = useTranslations('header')
  const dropDownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
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
    <header className="parent z-50 top-0 left-0 text-primary bg-secondary">
      <div className="container">
        {/*Logo && Locale*/}
        <div className="flex z-50 gap-4 justify-center items-center">
          {/*Logo*/}
            <Link href='/'>
              <Image priority src={'/Images/Logo.png'} alt="logo" width={220} height={100}/>
            </Link>
            <div ref={dropDownRef} onClick={()=>setToggle(!toggle)} className="relative cursor-pointer flex flex-col justify-center items-center gap-1 w-full">
              <p className="border uppercase p-1 flex justify-between items-center gap-1">{language === 'ar'?'ع':language}
              <Image  src={flag} alt={`flag-${language}`} width={20} height={20}/>
              </p>
              {toggle && <div  className="flex   px-2 flex-col justify-between items-center gap-2 absolute top-[120%] left-[25%]">
                <span onClick={()=>{setLanguage('ar');setToggle(false)}} className="hover:bg-secondary px-1 cursor-pointer flex justify-between items-center gap-1 w-full">ع
                <Image  src={'https://static.vecteezy.com/system/resources/previews/001/952/861/non_2x/egypt-flag-isolate-banner-print-illustration-eps-vector.jpg'} alt={`flag-${language}`} width={20} height={20}/>
                </span>
                <span onClick={()=>{setLanguage('en');setToggle(false)}} className="hover:bg-secondary px-1 cursor-pointer flex justify-between items-center gap-1 w-full">En
                <Image src={'https://static.vecteezy.com/system/resources/previews/002/417/819/non_2x/illustration-of-the-united-kingdom-flag-free-vector.jpg'} alt={`flag-${language}`} width={20} height={20} />
                </span>
                <span onClick={()=>{setLanguage('fr');setToggle(false)}} className="hover:bg-secondary px-1 cursor-pointer flex justify-between items-center gap-1 w-full">Fr
                <Image src={'https://static.vecteezy.com/system/resources/previews/004/313/578/non_2x/france-country-flag-free-vector.jpg'} alt={`flag-${language}`} width={20} height={20} />
                </span>
                <span onClick={()=>{setLanguage('sp');setToggle(false)}} className="hover:bg-secondary px-1 cursor-pointer flex justify-between items-center gap-1 w-full">Sp
                <Image src={'https://static.vecteezy.com/system/resources/previews/009/767/106/non_2x/spain-flag-flag-of-spain-illustration-free-vector.jpg'} alt={`flag-${language}`} width={20} height={20} />
                </span>
                <span onClick={()=>{setLanguage('it');setToggle(false)}} className="hover:bg-secondary px-1 cursor-pointer flex justify-between items-center gap-1 w-full">It
                <Image src={'https://static.vecteezy.com/system/resources/previews/002/417/790/non_2x/vectorial-illustration-of-the-italian-flag-free-vector.jpg'} alt={`flag-${language}`} width={20} height={20} />
                </span>
                <span onClick={()=>{setLanguage('zh');setToggle(false)}} className="hover:bg-secondary px-1 cursor-pointer flex justify-between items-center gap-1 w-full">Zh
                <Image src={'https://static.vecteezy.com/system/resources/previews/002/133/523/non_2x/chinese-flag-official-chinese-flag-with-original-color-and-size-proportion-free-vector.jpg'} alt={`flag-${language}`} width={20} height={20} />
                </span>
              </div>}
            </div>
        </div>

        {/*Login && NavList*/}
        <div className="flex gap-4 justify-center items-center">
          {/*Nav List*/}
          <nav >
            <ul className="flex justify-center items-center gap-2 px-2 ">
              {/* <li className="hover:bg-secondary hover:text-white duration-100 p-2 rounded-full cursor-pointer font-[600]"><Link href="/order" >{t('order')}</Link></li> */}
              <li className="hover:bg-secondary hover:text-white duration-100 p-2 rounded-full cursor-pointer font-[600]"><Link href="/" >{t('home')}</Link></li>
              <li className="hover:bg-secondary hover:text-white duration-100 p-2 rounded-full cursor-pointer font-[600]"><Link href="/menue" >{t('menue')}</Link></li>
              <li className="hover:bg-secondary hover:text-white duration-100 p-2 rounded-full cursor-pointer font-[600]"><Link href="/about" >{t('about')}</Link></li>
              <li className="hover:bg-secondary hover:text-white duration-100 p-2 rounded-full cursor-pointer font-[600]"><Link href="/contact" >{t('contact')}</Link></li>
            </ul>
          </nav>
          {/*Login*/}
          <Login_User />
        </div>
      </div>
    </header>
  )
}
