import Content_Container from "@/Components/Home/Content/Content_Container";
import Landing_Container from "@/Components/Home/Landing/Landing_Container";
import {use} from 'react';
import {setRequestLocale} from 'next-intl/server';

export default function HomePage({params}:{params:Promise<{locale:string}>}) {
    const {locale} = use(params);
  // Enable static rendering
  setRequestLocale(locale);
  return (
    <>
      {/*Landing Section*/}
      <Landing_Container />
      {/*Content Section*/}
      <Content_Container />
    </>
  )
}
