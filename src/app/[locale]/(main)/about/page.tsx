import { useTranslations } from "next-intl";
import Image from "next/image";

export default function About_Page() {
  const t = useTranslations('aboutpage')
  return (
    <section className="parent flex-col ">
      <div className="w-full text-white h-[600px] flex justify-center items-center bg-fixed bg-no-repeat bg-center bg-[url('https://static.vecteezy.com/system/resources/previews/032/579/943/non_2x/three-plates-with-food-on-them-in-front-of-a-blurry-background-ai-generated-free-photo.jpg')]">
            {/*Header*/}
            <div className="w-[50%]  flex flex-col justify-center items-center text-center gap-5 ">
               <h1 className=" text-[40px] md:text-[80px] font-[400]" style={{lineHeight:'48px'}}>{t('header')}</h1>
            </div>
      </div>
      {/*Our Story Content */}
      <div className="container flex-col">
        <div className="w-full flex flex-col md:flex-row justify-between items-start my-5 gap-5">
          {/*Image*/}
        <Image className="w-full" src="https://static.vecteezy.com/system/resources/previews/067/215/837/non_2x/professional-chef-presenting-a-gourmet-dish-with-a-smile-against-transparent-background-free-png.png" alt="image-head" width={400} height={500}/>
        {/*Content*/}
        <h2 className=" text-justify leading-loose">
          <h3 className="font-bold text-3xl text-shadow-2xs block my-5">{t('start')}</h3>
          {t('story')}
          </h2>
       </div>
      </div>
    </section>
  )
}
