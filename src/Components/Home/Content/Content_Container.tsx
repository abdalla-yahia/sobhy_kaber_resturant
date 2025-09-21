'use client'
import Image from "next/image";
import gsap from "gsap";
import {useGSAP} from '@gsap/react'
import {useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);
export default function Content_Container() {
  const sections = useTranslations('homepage.sections')
  const container = useRef<HTMLDivElement>(null);
  // useGSAP hook
  useGSAP(
    () => {
      // Titles
      gsap.utils.toArray<HTMLElement>(".section-title").forEach((title) => {
        gsap.from(title, {
          scrollTrigger: {
            trigger: title,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power4.out",
        });
      });

      // Texts
      gsap.utils.toArray<HTMLElement>(".section-text").forEach((text) => {
        gsap.from(text, {
          scrollTrigger: {
            trigger: text,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          x: 100,
          opacity: 0,
          duration: 1,
        });
      });

      // Images
      gsap.utils.toArray<HTMLImageElement>(".section-image").forEach((image) => {
        gsap.from(image, {
          scrollTrigger: {
            trigger: image,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          x: -100,
          opacity: 0,
          duration: 1,
        });
      });
    },
    { scope: container }
  );
  return (
    <section ref={container} className="parent flex-col my-5 overflow-x-hidden">
        {/*Header Section*/}
        <div className="header flex justify-center items-center flex-col gap-5">
            <h1 className="text-3xl font-bold">{sections('header')}</h1>
            <p className="text-lg font-light">{sections('text')}</p>
        </div>
        {/*Content Section*/}
        {/*Right*/}
        <div className="container">
            <div className="container flex-col gap-8">
                <h2 className="section-title text-3xl font-bold">{sections('section1.title')}</h2>
                <p className="section-text text-justify">{sections('section1.paragraph')}</p>
            </div>
            <Image className="section-image" src={'https://static.vecteezy.com/system/resources/previews/066/806/021/non_2x/fresh-cuts-of-raw-red-meat-with-herbs-for-culinary-use-and-cooking-free-png.png'} alt="content-image" width={450} height={450}/>
        </div>
        {/*Left*/}
        <div className="container">
            <Image className="section-image" src={'https://static.vecteezy.com/system/resources/previews/068/073/011/non_2x/wooden-soup-bowl-with-broth-and-warm-meal-free-png.png'} alt="content-image" width={450} height={450}/>
            <div className="container flex-col gap-8">
                <h2 className="section-title text-3xl font-bold">{sections('section2.title')}</h2>
                <p className="section-text text-justify">{sections('section2.paragraph')}</p>
            </div>
        </div>
        {/*Right*/}
        <div className="container">
            <div className="container flex-col gap-8">
                <h2 className="section-title text-3xl font-bold">{sections('section3.title')}</h2>
                <p className="section-text text-justify">{sections('section3.paragraph')}</p>
            </div>
            <Image className="section-image" src={'https://static.vecteezy.com/system/resources/previews/058/268/062/non_2x/delicious-gourmet-stew-in-a-black-pot-with-fresh-vegetables-and-herbs-free-png.png'} alt="content-image" width={450} height={450}/>
        </div>
        {/*Left*/}
        <div className="container">
            <Image className="section-image" src={'https://static.vecteezy.com/system/resources/previews/052/012/595/non_2x/delicious-bolognese-sauce-clipart-perfect-for-pasta-illustrations-free-png.png'} alt="content-image" width={450} height={450}/>
            <div className="container flex-col gap-8">
                <h2 className="section-title text-3xl font-bold">{sections('section4.title')}</h2>
                <p className="section-text text-justify">{sections('section4.paragraph')}</p>
            </div>
        </div>
    </section>
  )
}


