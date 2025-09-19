'use client'
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react"
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft} from "react-icons/md";

export default function Slider_Container() {
    const [currentIndex,setCurrentIndex]=useState(0)
    const TimeOutRef = useRef<NodeJS.Timeout | null>(null);
    const sliders = useTranslations('homepage.sliders')
    //Slider Content
    const slider = [{
        id:1,
        title:sliders('slider1.title'),
        paragraph:sliders('slider1.paragraph'),
        button:sliders('slider1.button'),
        image:'https://sobhykaber.sa/assets/images/backgrounds/fullscreen/venues.jpg?ch=2022-09-18',
    },
    {
        id:2,
        title:sliders('slider2.title'),
        paragraph:sliders('slider2.paragraph'),
        button:sliders('slider2.button'),
        image:'https://sobhykaber.sa/assets/images/backgrounds/fullscreen/private-dining.jpg?ch=2022-09-18',
    },
    {
        id:3,
        title:sliders('slider3.title'),
        paragraph:sliders('slider3.paragraph'),
        button:sliders('slider3.button'),
        image:'https://sobhykaber.sa/assets/images/backgrounds/fullscreen/culture.jpg?ch=2022-09-18',
    }
]
const nextSlide = ()=>{
    setCurrentIndex((prevIndex)=>(prevIndex + 1) % slider?.length)
}
useEffect(()=>{
     TimeOutRef.current = setTimeout(nextSlide, 5000)
    return () => clearTimeout(TimeOutRef.current as NodeJS.Timeout)
},[currentIndex])

  return (
    <div dir="ltr" className="w-full overflow-hidden relative">
        {/*Slide Container*/}
        <div className={`w-full flex transition-transform duration-1000 ease-in-out `} style={{ transform: `translateX(${-currentIndex * 100}%)` }}>
            {
                slider?.map(e=>
                    <div key={e.id} className="w-full relative min-h-screen flex-shrink-0">
                        <div className="w-full absolute top-0 left-0 bg-black/50 min-h-screen flex-shrink-0"></div>
                        <div  className={`w-full flex-shrink-0 min-h-screen bg-center bg-cover flex flex-col justify-center ${e.id === 1 ? 'items-center': 'items-end'} px-20 gap-5`} style={{backgroundImage:`url(${e.image})`}}>
                            <h2 className={` ${e.id === 2 ?'text-primary':'text-white'} z-50 text-[60px] font-extrabold w-[50%] ${e.id === 1 ? 'text-center':'text-end'}`}>
                                {e.title}
                            </h2>
                            <p className="text-[30px] z-50 text-white text-center" style={{letterSpacing:'10px'}}>
                                {e.paragraph}
                            </p>
                            <div className="slider-button p-3  group duration-1000 ease-in-out w-[180px]">
                                <button className="w-[180px] text-white p-1 border border-white whitespace-nowrap group-hover:border-transparent rounded cursor-pointer absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-50 hover:text-primary ease-in-out ">
                                    {e.button}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
        {/*Indecators*/}
        <div className="w-full flex justify-between items-center gap-2 absolute bottom-10 px-10">
            {/*Arrows*/}
            <div className="flex justify-between items-center">
                <MdOutlineKeyboardArrowLeft onClick={()=>currentIndex >= 1 && setCurrentIndex(currentIndex - 1)} className={`${currentIndex < 1 ? 'text-gray-600 cursor-not-allowed':'text-white cursor-pointer'} text-[80px] font-light `}/>
                <MdOutlineKeyboardArrowRight onClick={()=>currentIndex < slider?.length - 1 && setCurrentIndex(currentIndex + 1)} className={`${currentIndex === (slider?.length - 1) ? 'text-gray-600 cursor-not-allowed':'text-white cursor-pointer '} text-[80px] font-light`}/>
            </div>
            {/*Indecator*/}
            <div className="flex justify-between items-center gap-2">

            {
                slider?.map((_,index)=>
                    <p key={index} onClick={()=>setCurrentIndex(index)} className={`${index === currentIndex ? 'text-white -translate-y-1 duration-700 ease-in-out':'text-primary'} w-5 h-5 cursor-pointer rounded-full  font-bold ease-in-out `}>0{index+1}</p>
            )
            }
            </div>
        </div>
    </div>
  )
}
