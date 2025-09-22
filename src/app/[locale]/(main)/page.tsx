import Content_Container from "@/Components/Home/Content/Content_Container";
import Landing_Container from "@/Components/Home/Landing/Landing_Container";
import {use} from 'react';
import {setRequestLocale} from 'next-intl/server';
import ChatBot from "@/Components/Home/Chat/Chat_Container";

export default function HomePage({params}:{params:Promise<{locale:string}>}) {
    const {locale} = use(params);
  // Enable static rendering
  setRequestLocale(locale);
  return (
    <main className=" relative ">
      {/*Landing Section*/}
      <Landing_Container />
      {/*Content Section*/}
      <Content_Container />
      {/*AI Boot Chat*/}
      <div className=" fixed -bottom-5 right-0">
        <ChatBot />
      </div>
    </main>
  )
}

