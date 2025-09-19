'use client'
import Image from "next/image";
import Link from "next/link";
import HTMLFlipBook from "react-pageflip";
import {MdCall,MdLocationOn} from 'react-icons/md'
import { useLocale, useTranslations } from "next-intl";
import { RootState, useAppSelector } from "@/Libs/Store/Store";

export default function Content_Container() {
  const {AllCategories} = useAppSelector((state:RootState)=>state.category);
  const locale = useLocale()
  const t = useTranslations('menuepage')

  return (
    <section dir="rtl" className="w-full flex justify-center items-start gap-2 flex-wrap overflow-hidden">
      {/*Content Menue*/}
      {AllCategories?.categories?.length > 0 &&
      <HTMLFlipBook  width={400} height={600} drawShadow showCover={true} showPageCorners={true} className={""} style={{}} startPage={0} size={"fixed"} minWidth={0} maxWidth={0} minHeight={0} maxHeight={0} flippingTime={1500} usePortrait={false} startZIndex={0} autoSize={false} maxShadowOpacity={0} mobileScrollSupport={false} clickEventForward={false} useMouseEvents={true} swipeDistance={5} disableFlipByClick={false}>
        {/*Menu Cover*/}
            <div key={'cover'} className="w-full h-[150px] text-center relative flex flex-col p-1 justify-center items-center   bg-gradient-to-r to-orange-500 from-red-500">
            <Image src={'/Images/Logo.png'} alt="image-logo" width={500} height={150}/>
            <p className="text-xl font-bold text-center">{t('front.title')}</p>
            <Image className="w-full absolute top-[70%] skew-y-[23deg]" src={'https://static.vecteezy.com/system/resources/previews/069/729/225/non_2x/delicious-grilled-kofta-kebabs-on-a-skewer-closeup-shot-of-juicy-meatballs-free-png.png'}  alt="Kofta" width={150} height={20}/>
            <p className="text-sm font-medium text-black">{t('front.since')}</p>
            </div>
            <div className="text-black overflow-hidden w-full bg-gradient-to-r from-amber-100 to-orange-200 flex flex-col justify-start items-center gap-3 p-5">
             <Image src={'/Images/Logo.png'} alt="image-logo" width={500} height={150}/>
              <Image className="w-full absolute top-[70%] skew-y-[23deg]" src={'https://static.vecteezy.com/system/resources/previews/069/729/225/non_2x/delicious-grilled-kofta-kebabs-on-a-skewer-closeup-shot-of-juicy-meatballs-free-png.png'}  alt="Kofta" width={150} height={20}/>
            </div>
      {/*@To-Do Map-Categories*/}
      {
         AllCategories?.categories?.map((category)=>{
        const title = category?.translations?.find(t=>t.LocalId === locale)?.name
         return <div key={category?.id} className="text-black w-full bg-gradient-to-r from-amber-100 to-orange-200 flex flex-col justify-start items-center gap-3 p-5">
          <h2 className="mb-4">&#x06DE;ــــــــــــــــــــــــــــــ {title ? title : category?.title} ــــــــــــــــــــــــــــــ &#x06DE;</h2>
          <div className=" border border-primary rounded-lg my-4">
            <ul className="w-full p-2 gap-3">
              {
                category?.meals?.map((meal)=>{
                  const Mealtitle = meal?.translations?.find(t=>t.LocalId === locale)?.name;
                
                   return <li key={meal?.id} className="w-full flex justify-between items-center">
                    <span>{meal?.price}L.E</span>
                    <Link href={`/meals/${meal?.slug}`} className="text-[10px] ">{Mealtitle ? Mealtitle: meal?.title}</Link>
                    {meal?.image && <Image src={meal?.image} alt={meal?.title as string} width={50} height={50}/> }
                    </li>
                }
                )
              }
            </ul>
          </div>
        {category?.image && <Image className=" absolute bottom-0 left-[50%] -translate-x-[50%]" src={category?.image } alt={category?.title as string|| 'Category-image'} width={180} height={180}/>}
        </div> 
         }
        )
      }
      
            {/*Call Now*/}
            <div key={'call-now'} className="w-full text-center text-white h-[650px] flex flex-col px-1 pt-[90px] justify-start items-center bg-gradient-to-b from-orange-500 to-red-500 ">
                {/*Header Title*/}
                <h1 className="text-2xl relative text-center font-bold bg-amber-500  text-black rounded p-2 pr-9 mb-2">{t('back.advertis.title')}
                    <span className="bg-red-600 absolute top-[80%] right-0  rounded p-1 px-4 text-white">{t('back.advertis.free')}</span>
                </h1>
                {/*Text Content*/}
                <h2 className="text-4xl my-5 font-extrabold">
                    {t('back.advertis.ordernow')}
                </h2>
                {/*Phone*/}
                <p className="relative text-[70px] font-extrabold bg-amber-500 rounded-full px-3">
                    <span className="text-red-600" lang="ar" dir="rtl">{t('back.advertis.number')}</span>
                    <MdCall className=" absolute top-[50%] rotate-15 -translate-y-[50%] -left-0"/>
                </p>
                {/*Location*/}
                <div className="flex justify-end items-center my-3 gap-2">
                    <p className="text-sm text-end"> {t('back.advertis.address')}</p>
                    <MdLocationOn className="text-[40px] text-amber-500"/>
                </div>
                <span className="w-full text-amber-500 text-sm">{t('back.advertis.garage')}</span>
                {/*Flags*/}
                <div className="w-full flex justify-center items-center my-5 px-1">
                    <Image src={'https://static.vecteezy.com/system/resources/previews/012/301/146/non_2x/egypt-flag-free-png.png'} alt="Egypt-flag" width={80} height={80}/>
                    <Image src={'https://static.vecteezy.com/system/resources/previews/012/301/006/non_2x/saudi-arabia-flag-free-png.png'} alt="Sudi-flag" width={80} height={80}/>
                </div>
                <span className=" text-[10px]">{t('back.advertis.taxes')}</span>
            </div>
            {/*Our Story*/}
            <div key={'our-story'} className="w-full text-white p-5 flex flex-col items-center justify-center text-2xl font-bold bg-gradient-to-b to-orange-500 from-red-500 ">
                {/*Header Title*/}
                <h1 className="w-full text-3xl p-2 mb-2 text-center border-[30px] [border-image-slice:150] [border-image-source:url('https://static.vecteezy.com/system/resources/previews/031/401/309/non_2x/luxury-golden-rectangle-corner-certificate-border-pattern-line-photo-thai-frame-islamic-wedding-invitation-background-free-png.png')] ">{t('back.story.title')}</h1>
                {/*Text Content*/}
                <p className="text-justify  [text-align-last:justify] text-xl">{t('back.story.description')}</p>
            </div>
            
      </HTMLFlipBook>
      }
    </section>
  )
}
