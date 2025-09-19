import Link from 'next/link'
import * as icons from '@/Utils/Icons';
import dashboardIcons from '@/db/Icons-Dashboards.json'
import Dashboard_Icon from './Dashboard_Icon';
import { useTranslations } from 'next-intl';

export default function Aside_Dashboard({role}:{role:string}) {
  const t = useTranslations('dashboard')
  return (
    <aside className="w-[15%]  flex flex-col justify-start items-start rounded   text-[#3E445A] font-[400] text-sm gap-0 border border-[#E4E5EE]">

              {dashboardIcons?.admins?.map(icon=>{
                 return (icon?.id === 0) ? 
                (
                  <Link key={icon?.id} href={icon?.href} className='w-full bg-primary text-white text-sm md:text-2xl border duration-100 cursor-pointer p-3  flex justify-between items-start gap-3'>
                    <span className='hidden md:block'>{t(`${icon?.title}`)}</span>
                    <Dashboard_Icon icon={icon?.icon as keyof typeof icons}/>
                </Link>
                ):
                (<Link key={icon?.id} href={icon?.href} className='w-full hover:bg-primary hover:text-white duration-100 cursor-pointer p-3  flex justify-between items-start gap-3'>
                    <span className='hidden md:block'>{t(`${icon?.title}`)}</span>
                    <Dashboard_Icon icon={icon?.icon as keyof typeof icons}/>
                </Link>)
                })
              }
          
        </aside>
  )
}
