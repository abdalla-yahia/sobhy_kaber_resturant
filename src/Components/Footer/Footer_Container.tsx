import { useTranslations } from "next-intl"

export default function Footer_Container() {
    const t= useTranslations('contactpage')
  
  return (
    <footer className="relative px-[50px] bg-primary text-white flex justify-start items-start"> 
    {/*Contact*/} 
      <div className="w-[50%] flex flex-col gap-4 mt-[80px] h-fit">
          {/*Form Content*/}
            <div className='w-full flex flex-col justify-center items-center p-[8px] md:p-[40px] rounded-xl'>
                {/*Send Us*/}
                <div className='w-full flex flex-col justify-center items-center text-center p-3 md:p-7 border-b border-b-[#EDEEF5]'>
                    <h2 className='text-[20px] md:text-[40px] font-[400]' style={{lineHeight:'48px'}}>{t('form.send_us')}</h2>
                    <h5 className='text-[8px] md:text-[14px] font-[400]' style={{lineHeight:'24px'}}>{t('form.contact_text')}</h5>
                </div>
                {/*Contact Form*/}
                <form action="" className='w-[70%] flex flex-col justify-center py-8 items-center gap-5'>              
                    {/*Name & Email*/}
                    <div className='w-full flex justify-between items-center gap-5'>
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
      </div>
    </footer>
  )
}
