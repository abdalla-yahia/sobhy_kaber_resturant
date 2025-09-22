'use client'
import Image from "next/image";
import Link from "next/link";
import HTMLFlipBook from "react-pageflip";
import {MdCall,MdLocationOn} from 'react-icons/md'
import { useFormatter, useLocale, useTranslations } from "next-intl";
import { RootState, useAppSelector } from "@/Libs/Store/Store";
import { currencyMap } from "@/Utils/Currency";
import { useRef } from "react";

export default function Content_Container() {
  const {AllCategories} = useAppSelector((state:RootState)=>state.category);
  const locale = useLocale()
  const t = useTranslations('menuepage')
  const format = useFormatter()
  const audioRef = useRef<HTMLAudioElement>(null)
  //Get currency By Locale
  const currency = currencyMap[locale].format;

  //Play Sound Effect While Flip Page
  const PlayAudioFlip = ()=>{
    audioRef?.current?.play()
  }
  return (
    <section dir={locale === 'ar' ? 'rtl':'ltr'} className="w-full drop-shadow-2xl drop-shadow-black/40 flex justify-center items-start gap-2 my-5 flex-wrap">
      {/*Content Menue*/}
      {AllCategories?.categories?.length > 0 &&
      <HTMLFlipBook onFlip={()=>PlayAudioFlip()} width={400} height={600} drawShadow showCover={true} showPageCorners={true} className={""} style={{}} startPage={0} size={"stretch"} minWidth={300} maxWidth={800} minHeight={400} maxHeight={700} flippingTime={1500} usePortrait={true} startZIndex={0} autoSize={true} maxShadowOpacity={0} mobileScrollSupport={true} clickEventForward={false} useMouseEvents={true} swipeDistance={5} disableFlipByClick={false}>
        {/*Menu Cover*/}
            <div key={'cover'} className={`shadow w-full rounded-tl-2xl rounded-bl-2xl h-[150px] text-center relative flex flex-col p-1 justify-center items-center   bg-gradient-to-r to-orange-500 from-red-500`}>
            <Image src={'/Images/Logo.png'} className="text-center w-full drop-shadow-xl drop-shadow-black/40" alt="image-logo" width={500} height={500}/>
            <p className="text-xl font-bold text-center">{t('front.title')}</p>
            <Image className="w-[50%] absolute top-[70%] left-[50%] -translate-x-[50%] drop-shadow-xl drop-shadow-black" src={'https://static.vecteezy.com/system/resources/previews/058/267/874/non_2x/grilled-chicken-skewers-with-creamy-sauce-on-white-plate-free-png.png'}  alt="Kofta" width={150} height={20}/>
            <p className="text-sm font-medium text-black">{t('front.since')}</p>
            </div>
            {/*Empty*/}
            <div className="text-black rounded-tr-2xl rounded-br-2xl overflow-hidden w-full bg-gradient-to-r from-amber-100 to-orange-200 flex flex-col justify-start items-center gap-3 p-5">
             <Image src={'/Images/Logo.png'} className="w-full drop-shadow-xl drop-shadow-black/50" alt="image-logo" width={500} height={150}/>
              <Image className="w-[70%] absolute top-[60%] left-[50%] -translate-x-[50%] drop-shadow-xl drop-shadow-black" src={'https://static.vecteezy.com/system/resources/previews/068/186/318/non_2x/delicious-grilled-meat-skewers-with-fresh-lettuce-tomatoes-and-red-onion-rings-isolated-on-transparent-background-free-png.png'}  alt="Kofta" width={150} height={20}/>
            </div>
        {/*Map-Categories And Existes Meals*/}
            {
              AllCategories?.categories?.map((category,index:number)=>{
              const title = category?.translations?.find(t=>t.LocalId === locale)?.name
              return <div key={category?.id} className={`${index %2 !==0 ?'rounded-tr-2xl rounded-br-2xl':'rounded-tl-2xl rounded-bl-2xl'} text-black w-full bg-gradient-to-r from-amber-100 to-orange-200 flex flex-col justify-start items-center gap-3 p-5`}>
                <h2 className="mb-4">&#x06DE;ــــــــــــــــــــــــــــ {title ? title : category?.title} ــــــــــــــــــــــــــــ &#x06DE;</h2>
                <div className=" border border-primary rounded-lg my-4">
                  <ul className="w-full p-2 gap-5">
                    {
                      category?.meals?.map((meal)=>{
                        const Mealtitle = meal?.translations?.find(t=>t.LocalId === locale)?.name;
                        const price =Math.ceil(meal?.price as number / currencyMap[locale].amount as number).toFixed(2)
                        return <li key={meal?.id} className="w-full flex justify-between items-center px-3">
                          {/*Meal Title & Image*/}
                          <div className="flex justify-center items-center gap-4">
                            {meal?.image && <Image className="drop-shadow-lg drop-shadow-black/50" src={meal?.image} alt={meal?.title as string} width={50} height={50}/> }
                            <Link href={`/meals/${meal?.slug}`} className="text-[16px] ">{Mealtitle ? Mealtitle: meal?.title}</Link>
                          </div>
                          <span>{format.number(parseInt(price),{style: 'currency', currency})}</span>
                          </li>
                      }
                      )
                    }
                  </ul>
                </div>
              {category?.image && <Image className="hidden md:block absolute bottom-[10%] left-[50%] -translate-x-[50%] drop-shadow-xl drop-shadow-black" src={category?.image } alt={category?.title as string|| 'Category-image'} width={180} height={180}/>}
              </div> 
              }
              )
            }
        {/*Empty*/}
            {/*Empty*/}
            <div className="text-black rounded-tr-2xl rounded-br-2xl overflow-hidden w-full bg-gradient-to-r from-amber-100 to-orange-200 flex flex-col justify-start items-center gap-3 p-5">
             <Image src={'/Images/Logo.png'} className="w-full drop-shadow-xl drop-shadow-black/50" alt="image-logo" width={500} height={150}/>
              <Image className="w-[70%] absolute top-[60%] left-[50%] -translate-x-[50%] drop-shadow-xl drop-shadow-black" src={'https://static.vecteezy.com/system/resources/previews/068/186/318/non_2x/delicious-grilled-meat-skewers-with-fresh-lettuce-tomatoes-and-red-onion-rings-isolated-on-transparent-background-free-png.png'}  alt="Kofta" width={150} height={20}/>
            </div>
            {/*Call Now*/}
            <div key={'call-now'} className="w-full rounded-tl-2xl rounded-bl-2xl h-full text-center text-white pt-[40px] md:pt-[90px]  bg-gradient-to-b from-orange-500 to-red-500 ">
                <div className="w-full h-full  flex flex-col px-5 gap-[25px] md:gap-[65px] ">
                  {/*Header Title*/}
                  <h1 className="text-2xl relative text-center font-bold bg-amber-500  text-black rounded p-2 pr-9 mb-2">{t('back.advertis.title')}
                      <span className="bg-red-600 absolute top-[80%] right-0  rounded p-1 px-4 text-white">{t('back.advertis.free')}</span>
                  </h1>
                  {/*Text Content*/}
                  <h2 className="text-4xl  font-extrabold">
                      {t('back.advertis.ordernow')}
                  </h2>
                  {/*Phone*/}
                  <p className="relative text-[70px] font-extrabold bg-amber-500 rounded-full px-3">
                      <span className="text-red-600" lang="ar" dir="rtl">{t('back.advertis.number')}</span>
                      <MdCall className=" absolute top-[50%] rotate-15 -translate-y-[50%] -left-0"/>
                  </p>
                  {/*Location*/}
                  <div className="flex justify-end items-center  gap-2">
                      <p className="text-sm text-end"> {t('back.advertis.address')}</p>
                      <MdLocationOn className="text-[40px] text-amber-500"/>
                  </div>
                  <span className="w-full text-amber-500 text-sm">{t('back.advertis.garage')}</span>
                  {/*Flags*/}
                  <div className="w-full flex justify-center items-center  px-1">
                      <Image src={'https://static.vecteezy.com/system/resources/previews/012/301/146/non_2x/egypt-flag-free-png.png'} alt="Egypt-flag" width={80} height={80}/>
                      <Image src={'https://static.vecteezy.com/system/resources/previews/012/301/006/non_2x/saudi-arabia-flag-free-png.png'} alt="Sudi-flag" width={80} height={80}/>
                  </div>
                  <span className=" text-[10px]">{t('back.advertis.taxes')}</span>
                </div>
            </div>
            {/*Our Story*/}
            <div key={'our-story'} className="w-full rounded-tr-2xl rounded-br-2xl text-white p-5 flex flex-col items-center justify-center text-3xl font-bold bg-gradient-to-b to-orange-500 from-red-500 ">
                <div className="w-full h-full  flex flex-col px-5 gap-[10px] md:gap-[70px] ">
                  {/*Header Title*/}
                  <h1 className="w-full text-xl md:text-3xl p-2 mb-2 text-center border-[15px] md:border-[30px] [border-image-slice:150] [border-image-source:url('https://static.vecteezy.com/system/resources/previews/031/401/309/non_2x/luxury-golden-rectangle-corner-certificate-border-pattern-line-photo-thai-frame-islamic-wedding-invitation-background-free-png.png')] ">{t('back.story.title')}</h1>
                  {/*Text Content*/}
                  <p className="text-justify  [text-align-last:justify] text-sm md:text-xl leading-[25px] md:leading-[50px]">{t('back.story.description')}</p>
                </div>
            </div>
            
      </HTMLFlipBook>
      }
        <audio ref={audioRef} src={'/Audios/pageturn-102978.mp3'} className="hidden" controls/>
    </section>
  )
}
