import {FiPhoneCall} from 'react-icons/fi'
import {FaLocationDot} from 'react-icons/fa6'
import {MdOutlineLocalPostOffice} from 'react-icons/md'
import { useTranslations } from 'next-intl'
import NavigationMapWithVoice from '@/Components/Map/RestaurantMap'
export default function Contact_Page() {
    const restaurantLocation = { lat: 30.084209360637615, lng: 31.234315211841356 };
  const t= useTranslations('contactpage')
  const tt = useTranslations('menuepage')
  return (
    <section className='parent flex-col mt-[180px]'>
      <div className="w-full text-white h-[400px] flex justify-center items-center bg-fixed bg-no-repeat bg-center bg-[url('https://static.vecteezy.com/system/resources/previews/051/352/830/non_2x/blurry-background-of-restaurant-with-wooden-table-in-front-for-displaying-product-free-photo.jpg')]">
            {/*Header*/}
            <div className="w-[50%]  flex flex-col justify-center items-center text-center gap-5 ">
               <h1 className=" text-[20px] md:text-[40px] font-[400]" style={{lineHeight:'48px'}}>{t('header.contact')}</h1>
                <p className=" text-[8px] md:text-[14px] font-[400]  text-center w-full" style={{lineHeight:'24px'}}>{t('header.sub_contact')}</p>
            </div>
      </div>
        {/*Contact*/}      
     <section className="w-[90%] flex flex-col justify-center items-center gap-3 md:gap-9">
            {/*Contact*/}
            <div className="w-full flex justify-between items-center gap-2 md:gap-6">
                {/*Map Contact*/}
                <div className='w-1/3 flex flex-col gap-3 md:gap-9 justify-center p-3 md:p-7 rounded-2xl items-center bg-[#F3F3F6] border border-[#EDEEF5]'>
                    <FaLocationDot className='text-primary text-[18px] md:text-[36px]'/>
                    <h2 className='text-[#202435] text-[10px] md:text-[15px] font-[500] line-clamp-1 '>{tt('back.advertis.address')}</h2>
                    <p className='text-[#202435] text-[8px] md:text-[13px] font-[400] '>{t('header.location')}</p>
                </div>
                <div className='w-1/3 flex flex-col gap-3 md:gap-9 justify-center p-3 md:p-7 rounded-2xl items-center bg-[#F3F3F6] border border-[#EDEEF5]'>
                    <FiPhoneCall className='text-primary text-[18px] md:text-[36px]'/>
                    <h2 dir='ltr' className='text-[#202435] text-[10px] md:text-[15px] font-[500] line-clamp-1 '>+966 9200 13266</h2>
                    <p className='text-[#202435] text-[8px] md:text-[13px] font-[400] '>{t('header.phone')}</p>
                </div>
                <div className='w-1/3 flex flex-col gap-3 md:gap-9 justify-center p-3 md:p-7 rounded-2xl items-center bg-[#F3F3F6] border border-[#EDEEF5]'>
                    <MdOutlineLocalPostOffice className='text-primary text-[18px] md:text-[36px]'/>
                    <h2 className='text-[#202435] text-[10px] md:text-[15px] font-[500] line-clamp-1 '>
                      <a href="mailto:info@sobhykaber.sa" className="xsmall-title-oswald">info@sobhykaber.sa</a>
                    </h2>
                    <p className='text-[#202435] text-[8px] md:text-[13px] font-[400] '>{t('header.email')}</p>
                </div>
            </div>
            {/*Form Content*/}
            <div className='w-full flex flex-col justify-center items-center p-[8px] md:p-[40px] rounded-xl shadow-2xl shadow-[#000000]/8 border border-[#EDEEF5]'>
                {/*Send Us*/}
                <div className='w-[70%] flex flex-col justify-center items-center text-center p-3 md:p-7 border-b border-b-[#EDEEF5]'>
                    <h2 className='text-[20px] md:text-[40px] font-[400]' style={{lineHeight:'48px'}}>{t('form.send_us')}</h2>
                    <h5 className='text-[8px] md:text-[14px] font-[400]' style={{lineHeight:'24px'}}>{t('form.contact_text')}</h5>
                </div>
                {/*Contact Form*/}
                <form action="" className='w-[70%] flex flex-col justify-center py-8 items-center gap-5'>              
                    {/*Name & Email*/}
                    <div className='w-full flex justify-between items-center gap-5'>
                        {/*Name*/}
                        <div className='flex flex-col justify-start items-start w-full gap-3'>
                            <label htmlFor="">{t('form.name')}</label>
                            <input type="text" name="" id="" className='p-2 bg-[#F3F4F7] rounded w-full border'/>
                        </div>
                        {/*Email*/}
                        <div className='flex flex-col justify-start items-start w-full gap-3'>
                            <label htmlFor="">{t('form.email')}*</label>
                            <input type="email" name="" id="" className='p-2 bg-[#F3F4F7] rounded w-full border'/>
                        </div>
                    </div>
                    {/**/}
                    {/*Phone number*/}
                    <div className='flex flex-col justify-start items-start w-full gap-3'>
                        <label htmlFor="">{t('form.phone')}</label>
                        <input type="email" name="" id="" className='p-2 bg-[#F3F4F7] rounded w-full border'/>
                    </div>
                    {/*Your message*/}
                    <div className='flex flex-col justify-start items-start w-full gap-3'>
                        <label htmlFor="">{t('form.message')}</label>
                        <textarea name="" id="" className='p-6 resize-none bg-[#F3F4F7] rounded w-full border'></textarea>
                    </div>
                    {/*Submit Button*/}
                    <button type='submit' className='p-3 px-6 bg-primary rounded cursor-pointer text-white mr-auto'>{t('form.send')}</button>
                </form>
            </div>
      </section>
      {/*Map*/}
      <section className='w-full'>
       <NavigationMapWithVoice destination={restaurantLocation}/>
      </section>
    </section>
  )
}
