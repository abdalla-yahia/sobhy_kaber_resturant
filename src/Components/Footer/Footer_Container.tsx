import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import {FiPhoneCall} from 'react-icons/fi';
import {FaWhatsapp} from 'react-icons/fa';

export default function Footer_Container() {
    const t= useTranslations('contactpage')
    const tt = useTranslations('header')
    const tf = useTranslations('footer')
  return (
    <footer className="relative px-[50px] bg-secondary text-white flex flex-col justify-start items-start"> 
        <div className="w-full md:w-[90%] flex flex-col-reverse md:flex-row justify-between items-start mt-[80px]">
                {/*Contact*/} 
                <div className="w-full md:w-[50%] flex flex-col gap-4  h-fit">
                    {/*Form Content*/}
                        <div className='w-full flex flex-col justify-center items-center  rounded-xl'>
                            {/*Send Us*/}
                            <div className='w-full flex flex-col justify-center gap-5 py-3 items-center text-center border-b border-b-[#EDEEF5]'>
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
                                <button type='submit' className='p-3 px-6 bg-secondary rounded cursor-pointer text-white mr-auto'>{t('form.send')}</button>
                            </form>
                        </div>
                </div>
                {/*Nav List && Logo*/}
                <div className="w-full md:w-[50%] flex flex-row-reverse justify-between items-start md:flex-col md:justify-end md:items-end gap-4  h-fit">
                {/*Logo*/}
                    <Link href='/'>
                    <Image priority src={'/Images/Logo.png'} className="drop-shadow-2xl" alt="logo" width={220} height={100}/>
                    </Link>
                    {/*Nav List*/}
                    <ul className="w-full flex  flex-col justify-start items-start md:justify-end md:items-end gap-2 px-8 ">
                        <li className="hover:bg-primary duration-100 p-2 rounded cursor-pointer font-[600]"><Link  href="/" >{tt('home')}</Link></li>
                        <li className="hover:bg-primary duration-100 p-2 rounded cursor-pointer font-[600]"><Link  href="/menu" >{tt('menue')}</Link></li>
                        <li className="hover:bg-primary duration-100 p-2 rounded cursor-pointer font-[600]"><Link  href="/about" >{tt('about')}</Link></li>
                        <li className="hover:bg-primary duration-100 p-2 rounded cursor-pointer font-[600]"><Link  href="/contact" >{tt('contact')}</Link></li>
                    </ul> 
                </div>
        </div>
        {/*Social Media*/}
        <div className="w-full flex justify-center items-center py-[30px]">
                <div className="w-[90%] flex flex-col md:flex-row justify-start  md:justify-between items-center border-b py-[40px] border-b-[#E4E5EE]">
                    {/*Phone Number*/}
                    <div className="flex justify-center md:justify-between items-center gap-2">
                        {/*Icon*/}
                        <div className="icon p-2 rounded-full border border-[#E4E5EE]">
                          <FiPhoneCall className="text-3xl"/>
                        </div>
                        {/*Number*/}
                        <div className="flex flex-col justify-start items-start">
                            <h3 dir="ltr" className="font-[600] text-[20px]" style={{lineHeight:'24px'}}>+966 9200 13266</h3>
                            <span className="font-[400] text-[11px] opacity-50" style={{lineHeight:'16.5px',letterSpacing:'-0.1px'}}>{tf('work')} 8:00 - 22:00</span>
                        </div>
                    </div>
                    {/*Download App*/}
                    <div className="flex flex-col md:flex-row my-[15px] justify-center md:justify-between items-center gap-2">
                        {/*Title*/}
                        <div className="flex flex-col justify-start items-start">
                            <h4 className="font-[600] text-[14px]" style={{lineHeight:'16.8px'}}>{tf('download')} :</h4>
                            <span className="font-[400] text-[12px] opacity-50" style={{lineHeight:'18px',letterSpacing:'-0.1px'}}>{tf('discount')}</span>
                        </div>
                        <Image src={'https://res.cloudinary.com/dghqvxueq/image/upload/v1756272951/app-store_2_gsmvld.png'} alt="" width={150} height={50}/>
                        <Image src={'https://res.cloudinary.com/dghqvxueq/image/upload/v1756272923/app-store_1_ugwndd.png'} alt="" width={150} height={50}/>
                        {/*Social Media Icons*/}
                    <div className="flex justify-between items-center gap-2">
                        <div className="icon border-[#E4E5EE] border rounded-full p-2">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_1_852)">
                                <path d="M11.7425 0.475176V2.68018H10.4375C9.95745 2.68018 9.63245 2.78018 9.46245 2.98018C9.29245 3.18018 9.20745 3.48018 9.20745 3.88018V5.47018H11.6675L11.3375 7.94518H9.20745V14.3052H6.64245V7.94518H4.51245V5.47018H6.64245V3.64018C6.64245 2.60018 6.93245 1.79518 7.51245 1.22518C8.09245 0.655176 8.86745 0.370176 9.83745 0.370176C10.6575 0.370176 11.2925 0.405176 11.7425 0.475176Z" fill="#233A95"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_1_852">
                                <rect width="15" height="15" fill="white" transform="matrix(1 0 0 -1 0.5 15.3701)"/>
                                </clipPath>
                                </defs>
                                </svg>
                        </div>
                        <div className="icon border-[#E4E5EE] border rounded-full p-2">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.6 3.79029C14.23 4.33029 13.78 4.79529 13.25 5.18529V5.53029C13.25 6.26029 13.145 6.98529 12.935 7.70529C12.725 8.42529 12.405 9.12029 11.975 9.79029C11.545 10.4603 11.03 11.0453 10.43 11.5453C9.83004 12.0453 9.11004 12.4553 8.27004 12.7753C7.43004 13.0953 6.52504 13.2453 5.55504 13.2253C4.04504 13.2253 2.66504 12.8203 1.41504 12.0103C1.60504 12.0303 1.82004 12.0403 2.06004 12.0403C3.32004 12.0403 4.44004 11.6553 5.42004 10.8853C4.83004 10.8753 4.30504 10.6953 3.84504 10.3453C3.38504 9.99529 3.06504 9.55029 2.88504 9.01029C3.07504 9.04029 3.24504 9.05529 3.39504 9.05529C3.63504 9.05529 3.87504 9.02529 4.11504 8.96529C3.48504 8.83529 2.96504 8.52529 2.55504 8.03529C2.14504 7.54529 1.94004 6.97029 1.94004 6.31029V6.28029C2.32004 6.49029 2.73004 6.60529 3.17004 6.62529C2.80004 6.37529 2.50504 6.05529 2.28504 5.66529C2.06504 5.27529 1.95504 4.84029 1.95504 4.36029C1.95504 3.88029 2.08004 3.43029 2.33004 3.01029C3.01004 3.84029 3.83004 4.50529 4.79004 5.00529C5.75004 5.50529 6.79004 5.78029 7.91004 5.83029C7.86004 5.62029 7.83504 5.41529 7.83504 5.21529C7.83504 4.46529 8.10004 3.83029 8.63004 3.31029C9.16004 2.79029 9.79504 2.52528 10.535 2.51529C11.325 2.51529 11.985 2.80029 12.515 3.37029C13.125 3.25029 13.7 3.03028 14.24 2.71029C14.03 3.35029 13.63 3.85029 13.04 4.21029C13.56 4.15029 14.08 4.01029 14.6 3.79029Z" fill="#233A95"/>
                        </svg>
                        </div>
                        <div className="icon border-[#E4E5EE] border rounded-full p-2">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M10.1375 7.87018C10.1375 7.28018 9.93251 6.77518 9.52251 6.35518C9.11251 5.93518 8.60751 5.72518 8.00751 5.72518C7.40751 5.72518 6.90251 5.93518 6.49251 6.35518C6.08251 6.77518 5.87251 7.28018 5.86251 7.87018C5.85251 8.46018 6.06251 8.96518 6.49251 9.38518C6.92251 9.80518 7.42751 10.0152 8.00751 10.0152C8.58751 10.0152 9.09251 9.80518 9.52251 9.38518C9.95251 8.96518 10.1575 8.46018 10.1375 7.87018ZM11.2925 7.87018C11.2925 8.78018 10.9725 9.56018 10.3325 10.2102C9.69251 10.8602 8.91751 11.1802 8.00751 11.1702C7.09751 11.1602 6.31751 10.8402 5.66751 10.2102C5.01751 9.58018 4.69751 8.80018 4.70751 7.87018C4.71751 6.94018 5.03751 6.16018 5.66751 5.53018C6.29751 4.90018 7.07751 4.58018 8.00751 4.57018C8.93751 4.56018 9.71251 4.88018 10.3325 5.53018C10.9525 6.18018 11.2725 6.96018 11.2925 7.87018ZM12.2075 4.43518C12.2075 4.64518 12.1325 4.82518 11.9825 4.97518C11.8325 5.12518 11.6475 5.20018 11.4275 5.20018C11.2075 5.20018 11.0275 5.12518 10.8875 4.97518C10.7475 4.82518 10.6725 4.64518 10.6625 4.43518C10.6525 4.22518 10.7275 4.04518 10.8875 3.89518C11.0475 3.74518 11.2275 3.67018 11.4275 3.67018C11.6275 3.67018 11.8125 3.74518 11.9825 3.89518C12.1525 4.04518 12.2275 4.22518 12.2075 4.43518ZM8.00751 2.59018C7.96751 2.59018 7.75251 2.59018 7.36251 2.59018H6.47751C6.27751 2.59018 6.00751 2.60018 5.66751 2.62018C5.32751 2.64018 5.04251 2.66518 4.81251 2.69518C4.58251 2.72518 4.38251 2.78018 4.21251 2.86018C3.93251 2.97018 3.68751 3.13018 3.47751 3.34018C3.26751 3.55018 3.10251 3.79518 2.98251 4.07518C2.92251 4.23518 2.87251 4.43518 2.83251 4.67518C2.79251 4.91518 2.76251 5.20518 2.74251 5.54518C2.72251 5.88518 2.71751 6.15018 2.72751 6.34018C2.73751 6.53018 2.73751 6.82518 2.72751 7.22518C2.71751 7.62518 2.71751 7.84018 2.72751 7.87018C2.73751 7.90018 2.73751 8.11518 2.72751 8.51518C2.71751 8.91518 2.71751 9.21018 2.72751 9.40018C2.73751 9.59018 2.74251 9.85518 2.74251 10.1952C2.74251 10.5352 2.77251 10.8252 2.83251 11.0652L2.98251 11.6652C3.10251 11.9452 3.26751 12.1902 3.47751 12.4002C3.68751 12.6102 3.93251 12.7702 4.21251 12.8802C4.37251 12.9402 4.57251 12.9952 4.81251 13.0452C5.05251 13.0952 5.33751 13.1202 5.66751 13.1202C5.99751 13.1202 6.26751 13.1302 6.47751 13.1502C6.68751 13.1702 6.98251 13.1702 7.36251 13.1502C7.74251 13.1302 7.95751 13.1302 8.00751 13.1502C8.05751 13.1702 8.26751 13.1702 8.63751 13.1502C9.00751 13.1302 9.30251 13.1302 9.52251 13.1502C9.74251 13.1702 10.0125 13.1602 10.3325 13.1202C10.6525 13.0802 10.9425 13.0552 11.2025 13.0452C11.4625 13.0352 11.6575 12.9802 11.7875 12.8802C12.0675 12.7702 12.3175 12.6102 12.5375 12.4002C12.7575 12.1902 12.9175 11.9452 13.0175 11.6652C13.0775 11.5052 13.1275 11.3052 13.1675 11.0652C13.2075 10.8252 13.2375 10.5352 13.2575 10.1952C13.2775 9.85518 13.2825 9.59018 13.2725 9.40018C13.2625 9.21018 13.2625 8.91518 13.2725 8.51518C13.2825 8.11518 13.2825 7.90018 13.2725 7.87018C13.2625 7.84018 13.2625 7.62518 13.2725 7.22518C13.2825 6.82518 13.2825 6.53018 13.2725 6.34018C13.2625 6.15018 13.2575 5.88518 13.2575 5.54518C13.2575 5.20518 13.2275 4.91518 13.1675 4.67518L13.0175 4.07518C12.9075 3.79518 12.7475 3.55018 12.5375 3.34018C12.3275 3.13018 12.0775 2.97018 11.7875 2.86018C11.6275 2.80018 11.4325 2.74518 11.2025 2.69518C10.9725 2.64518 10.6825 2.62018 10.3325 2.62018C9.98251 2.62018 9.71251 2.61018 9.52251 2.59018C9.33251 2.57018 9.03751 2.57018 8.63751 2.59018C8.23751 2.61018 8.02751 2.61018 8.00751 2.59018ZM14.4275 7.87018C14.4275 9.15018 14.4125 10.0352 14.3825 10.5252C14.3325 11.6852 13.9875 12.5852 13.3475 13.2252C12.7075 13.8652 11.8125 14.2102 10.6625 14.2602C10.1625 14.2902 9.27751 14.3052 8.00751 14.3052C6.73751 14.3052 5.85251 14.2902 5.35251 14.2602C4.19251 14.2002 3.29251 13.8552 2.65251 13.2252C2.01251 12.5952 1.66751 11.6952 1.61751 10.5252C1.58751 10.0352 1.57251 9.15018 1.57251 7.87018C1.57251 6.59018 1.58751 5.70518 1.61751 5.21518C1.66751 4.05518 2.01251 3.15518 2.65251 2.51518C3.29251 1.87518 4.19251 1.53018 5.35251 1.48018C5.84251 1.45018 6.72751 1.43518 8.00751 1.43518C9.28751 1.43518 10.1725 1.45018 10.6625 1.48018C11.8225 1.54018 12.7175 1.88518 13.3475 2.51518C13.9775 3.14518 14.3225 4.04518 14.3825 5.21518C14.4125 5.70518 14.4275 6.59018 14.4275 7.87018Z" fill="#233A95"/>
                            </svg>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        {/*Copy Rights*/}
        <div className='w-full flex justify-center items-center pb-[40px]'>
        <div className="w-[90%] flex flex-col md:flex-row justify-center md:justify-between items center gap-2">
            {/*CopyRights*/}
           <span className="w-full font-[400] text-[12px] opacity-50" style={{lineHeight:'18px',letterSpacing:'-0.1px'}}>{tf('copyDate')} {new Date().getFullYear()} © {tf('copright')} - {tf('sophy')}</span>
            {/*Credit Cards*/}
            <div className="w-full flex justify-between items-center gap-2">
                <span className="font-[400] text-[12px] opacity-50" style={{lineHeight:'18px',letterSpacing:'-0.1px'}}>Privacy Policy</span>
                <span className="font-[400] text-[12px] opacity-50" style={{lineHeight:'18px',letterSpacing:'-0.1px'}}>Terms and Conditions</span>
                <span className="font-[400] text-[12px] opacity-50" style={{lineHeight:'18px',letterSpacing:'-0.1px'}}>Cookie</span>
                <Image src='https://res.cloudinary.com/dghqvxueq/image/upload/v1756273627/credit-card_atv6sq.png' alt='credit-image' width={300} height={100} />
            </div>
        </div>
            </div>
             {/**Site Developer */}
                <div className="w-full flex flex-wrap justify-center items-center text-xs  gap-1">
                    <span>{tf('developed')}</span>
                    <Link
                    href="https://www.linkedin.com/in/abdalla-yahia/"
                    target="_blank"
                    className="hover:underline text-blue-600 font-medium flex items-center gap-1"
                    >
                    {tf('eng')} Abdalla Yahia <span className="text-red-500">™</span>
                    </Link>
                    <span className="opacity-60">© {tf('copright')}</span>
                    <span className="flex items-center gap-1">
                    - {tf('contact')}:
                    <FaWhatsapp className="text-green-800 shadow" />
                    <Link
                        href="https://wa.me/201211100554?text=Hello%20Eng.%20Abdalla,%20I%20would%20like%20to%20connect%20with%20you%20for%20website%20development."
                        target="_blank"
                        className="hover:underline "
                    >
                        01211100554
                    </Link>
                    </span>
                </div>

    </footer>
  )
}
