import Content_Container from "./Content/Content_Container";

export default function Menue_Container() {
  return (
    <main className="parent mt-[150px]">
        <section className="flex justify-start items-start w-[90%] gap-5">
            {/*Content Container*/}
            <Content_Container/>
        </section>
    </main>
  )
}
