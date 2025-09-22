import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react"

export default function Slider_Container_Hook() {
    const [currentIndex,setCurrentIndex]=useState(0)
    const TimeOutRef = useRef<NodeJS.Timeout | null>(null);
    const sliders = useTranslations('homepage.sliders')
    //Slider Content
    const slider = [{
        id:1,
        title:sliders('slider1.title'),
        paragraph:sliders('slider1.paragraph'),
        button:sliders('slider1.button'),
        href:'/menu',
        image:'https://static.vecteezy.com/system/resources/previews/034/304/730/non_2x/two-plates-of-pasta-and-a-bowl-of-salad-on-a-table-ai-generated-free-photo.jpg',
    },
    {
        id:2,
        title:sliders('slider2.title'),
        paragraph:sliders('slider2.paragraph'),
        button:sliders('slider2.button'),
        href:'/contact',
        image:'https://static.vecteezy.com/system/resources/previews/059/220/276/non_2x/flavorful-middle-eastern-cuisine-on-display-free-photo.jpg',
    },
    {
        id:3,
        title:sliders('slider3.title'),
        paragraph:sliders('slider3.paragraph'),
        button:sliders('slider3.button'),
        href:'/about',
        image:'https://static.vecteezy.com/system/resources/previews/069/181/133/non_2x/night-market-dinner-cairo-mosque-backdrop-tourist-meal-free-photo.jpg',
    },
    {
        id:4,
        title:sliders('slider4.title'),
        paragraph:sliders('slider4.paragraph'),
        button:sliders('slider4.button'),
        href:'/',
        image:'https://static.vecteezy.com/system/resources/previews/056/040/498/non_2x/a-woman-is-holding-a-plate-of-food-at-a-buffet-free-photo.jpeg',
    },
]
const nextSlide = ()=>{
    setCurrentIndex((prevIndex)=>(prevIndex + 1) % slider?.length)
}
useEffect(()=>{
     TimeOutRef.current = setTimeout(nextSlide, 5000)
    return () => clearTimeout(TimeOutRef.current as NodeJS.Timeout)
},[currentIndex])

  return {slider,currentIndex,setCurrentIndex}
}
