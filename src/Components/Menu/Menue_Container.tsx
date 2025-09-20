import { useTranslations } from "next-intl";
import Content_Container from "./Content/Content_Container";

export default function Menue_Container() {
  const t = useTranslations('header')
  return (
    <main className="parent mt-[50px]">
        <section className="flex flex-col justify-center items-center w-[90%] gap-8">
          <h1 className="text-primary text-5xl font-bold">{t('menue')}</h1>
            {/*Content Container*/}
            <Content_Container/>
        </section>
    </main>
  )
}
