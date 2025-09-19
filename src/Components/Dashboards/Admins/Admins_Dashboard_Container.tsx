'use client';
import { RootState, useAppSelector } from '@/Libs/Store/Store';
import * as icon from '@/Utils/Icons'
import { useTranslations } from 'next-intl';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';




export default function Admins_Dashboard_Container() {
  const { LogedUser } = useAppSelector((state: RootState) => state.auth)
  const { AllUsers } = useAppSelector((state: RootState) => state.user)
  const { AllMeals } = useAppSelector((state: RootState) => state.meals)
  const t= useTranslations('dashboard.home')

  const salesData = [
    { day: `${t('Saturday')}`, sales: 1000 },
    { day: `${t('Sunday')}`, sales: 1500 },
    { day: `${t('Monday')}`, sales: 2300 },
    { day: `${t('Tuesday')}`, sales: 1800 },
    { day: `${t('Wednesday')}`, sales: 2800 },
    { day: `${t('Thursday')}`, sales: 3500 },
    { day: `${t('Friday')}`, sales: 2200 },
  ];
  
  return (
    <div className="py-6 space-y-6 w-full">
      {/*Page Title*/}
      <h1 className="text-2xl font-bold text-primary my-3 gap-3 flex justify-start items-center">
        <icon.IoBarChart className="text-2xl" />
        {t('title')} {LogedUser?.user?.name}</h1>
      {/* State cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/*USERS COUNT*/}
        <div className="bg-white  p-4 rounded shadow flex items-center gap-4">
          <div className="text-3xl">
            <icon.FaUsers className='text-primary' />
          </div>
          <div>
            <p className="text-gray-500 text-sm">{t('allusers')}</p>
            <p className="text-lg font-bold">{AllUsers?.users?.length}</p>
          </div>
        </div>
        {/*TOTAL PRODUCTS*/}
        <div className="bg-white  p-4 rounded shadow flex items-center gap-4">
          <div className="text-3xl">
            <icon.FaBoxOpen className='text-primary' />
          </div>
          <div>
            <p className="text-gray-500 text-sm">{t('allmeals')}</p>
            <p className="text-lg font-bold">{AllMeals?.FullyMeals?.length}</p>
          </div>
        </div>
        {/*TOTAL SALE*/}
        <div className="bg-white  p-4 rounded shadow flex items-center gap-4">
          <div className="text-3xl">
            <icon.GrCurrency className='text-primary' />
          </div>
          <div>
            <p className="text-gray-500 text-sm">{t('totalprice')}</p>
            <p className="text-lg font-bold">4,500 USD</p>
          </div>
        </div>
      </div>



      <div className="bg-white  py-4 rounded shadow w-full">
        <h2 className="text-xl font-semibold mb-4">{t('weekly')}</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
