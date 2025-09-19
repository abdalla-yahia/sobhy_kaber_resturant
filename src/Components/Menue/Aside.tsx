import Image from "next/image";
import {MdCall,MdLocationOn} from 'react-icons/md'
export default function Aside() {
  return (
    <aside className=" w-full">
        {/*Our Story*/}
        <div className="w-full rounded-xl h-[680px] flex flex-col p-5 justify-start items-center bg-gradient-to-b to-orange-500 from-red-500  [clip-path:polygon(0_0,100%_0%,100%_87%,0%_100%)]">
            {/*Header Title*/}
            <h1 className="text-3xl p-2 mb-2 text-center border-[30px] [border-image-slice:150] [border-image-source:url('https://static.vecteezy.com/system/resources/previews/031/401/309/non_2x/luxury-golden-rectangle-corner-certificate-border-pattern-line-photo-thai-frame-islamic-wedding-invitation-background-free-png.png')] ">قصة كفاحه</h1>
            {/*Text Content*/}
            <p className="text-justify  [text-align-last:justify]">
                صبحي كابر هو رمز للكفاح المُلهم , إذ بدأ رحلته بعربة بسيطة تضم عداً محدوداً من الأصناف. وبعدما حقق نجاحاً ملحوظاً, اتخذ قرار التوسعة حيث اشترى مزرعة كبيرة لتربية المواشي تحت إشرافه الشخصي. 
                في عام 2016اشترى صبحي كابر موقعاً جديداً ليفتح فرعاً جديداً ز منتقلاً من فرعه القديم , هذا الفرع الجديد هو فرعه الوحيد له في مصر , وقد تم إفتتاح فرع جديد في المملكة
            </p>
        </div>
        {/*Site Logo*/}
        <div className="w-full rounded-xl h-[150px] relative flex p-1 justify-between items-center  -skew-y-[23deg] bg-gradient-to-l to-orange-500 from-red-500">
        <p className="text-sm font-medium text-black">منذ 1996</p>
        <Image src={'/Images/Logo.png'} alt="image-logo" width={100} height={150}/>
        <p className="text-xl font-bold text-center">كبابجي صبحي كابر</p>
        <Image className="w-full absolute top-[70%] skew-y-[23deg]" src={'https://static.vecteezy.com/system/resources/previews/069/729/225/non_2x/delicious-grilled-kofta-kebabs-on-a-skewer-closeup-shot-of-juicy-meatballs-free-png.png'}  alt="Kofta" width={150} height={20}/>
        </div>
        {/*Call Now*/}
        <div className="w-full rounded-xl h-[650px] flex flex-col px-1 pt-[90px] justify-start items-center bg-gradient-to-b from-orange-500 to-red-500  [clip-path:polygon(0%_17%,100%_0%,100%_100%,0%_100%)]">
            {/*Header Title*/}
            <h1 className="text-2xl relative text-center font-bold bg-amber-500 -skew-y-[23deg] text-black rounded p-2 pr-9 mb-2">جميع أنواع السلطات والعيش
                <span className="bg-red-600 absolute top-[80%] right-0 skew-y-[23deg] rounded p-1 px-4 text-white">مجـانـاً</span>
            </h1>
            {/*Text Content*/}
            <h2 className="text-4xl my-5 font-extrabold">
                اطلب الأن
            </h2>
            {/*Phone*/}
            <p className="relative text-[50px] font-extrabold bg-amber-500 rounded-full px-3">
                <span className="text-red-600" lang="ar" dir="rtl">&#x661;&#x666;&#x666;&#x664;&#x660;</span>
                <MdCall className=" absolute top-[50%] rotate-15 -translate-y-[50%] -left-5"/>
            </p>
            {/*Location*/}
            <div className="flex justify-between items-center my-3 gap-2">
                <p className="text-sm text-end"> &#x661;&#x665;&#x661; ش عبيد أبراج الصفوة - خلف نادي الكهرباء -شبرا الساحل</p>
                <MdLocationOn className="text-[70px] text-amber-500"/>
            </div>
            <span className="w-full text-amber-500 text-sm">يوجد جراج خاص أسفل المطعم</span>
            {/*Flags*/}
            <div className="w-full flex justify-between items-center my-5 px-1">
                <Image src={'https://static.vecteezy.com/system/resources/previews/012/301/146/non_2x/egypt-flag-free-png.png'} alt="Egypt-flag" width={80} height={80}/>
                <Image src={'https://static.vecteezy.com/system/resources/previews/012/301/006/non_2x/saudi-arabia-flag-free-png.png'} alt="Sudi-flag" width={80} height={80}/>
            </div>
            <span className=" text-[10px]">جميع الأسعار شاملة ضريبة القيمة المضافة</span>
        </div>
    </aside>
  )
}
