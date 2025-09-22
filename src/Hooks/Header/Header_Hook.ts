'use client'
import { RootState, useAppDispatch, useAppSelector } from "@/Libs/Store/Store";
import { getAllLanguagies } from "@/Features/Actions/LanguageActions";
import { usePathname, useRouter} from '@/i18n/navigation';
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

export default function HeaderHook({currentLocale}: {currentLocale: string}){
  const {AllLanguages} = useAppSelector((state:RootState)=>state.language)
  const [language,setLanguage] = useState<string>(currentLocale)
  const [flag,setFlag] = useState<string>('')
  const [toggle,setToggle] = useState<boolean>(false)
  const [toggleMenuLink,setToggleMenuLink] = useState<boolean>(false)
  const t = useTranslations('header')
  const dropDownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const dispatch = useAppDispatch()
  //Get All Locale Existes
  useEffect(()=>{
    dispatch(getAllLanguagies())
  },[dispatch])
  //Close DropDowns If User Click On Body
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
  //Add Background to header While Scroll 
  useEffect(() => {
    const header = document.querySelector('.header') as HTMLElement;
    header.style.boxShadow = "2px 2px 2px rgba(0,0,0,.1)";
    if( window.innerWidth < 767){
          header.style.backgroundColor = "#1aa384";
          header.style.boxShadow = "2px 2px 2px rgba(0,0,0,.1)";
        }
    const handleScroll = () => {
      if (window.scrollY >= 50 && window.innerWidth > 767) {
        header.style.backgroundColor = "#1aa384";
        header.style.boxShadow = "2px 2px 2px rgba(0,0,0,.1)";
      } else if( window.innerWidth < 767){
        header.style.backgroundColor = "#1aa384";
        header.style.boxShadow = "2px 2px 2px rgba(0,0,0,.1)";
      }else {
        header.style.backgroundColor = "transparent"; 
        header.style.boxShadow = "none";
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

    return {language,AllLanguages,setLanguage,flag,setToggle,toggle,setToggleMenuLink,toggleMenuLink,t,dropDownRef}
}