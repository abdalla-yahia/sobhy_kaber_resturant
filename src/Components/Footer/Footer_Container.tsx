
export default function Footer_Container() {
  return (
    <footer className="relative px-[50px] h-[450px] bg-primary text-white flex justify-start items-start"> 
    {/*Header*/}
    <div className="w-full h-[25px] bg-secondary absolute to-0% left-0"></div>
    {/*Contact*/} 
      <div className="w-[90%] flex flex-col gap-4 mt-[80px]">
          {/*Email*/}
          <div className="w-[50%] ml-auto flex flex-col gap-4 justify-start items-start">
            <label htmlFor="Email-Footer" className="text-2xl font-semibold">Contact</label>
            <input type="email" name="" id="Email-Footer" placeholder="Enter Your Email @" className="w-full p-2 text-gray-500 rounded bg-white font-bold"/>
            <button className="p-2 rounded bg-secondary cursor-pointer w-[25%] px-4.5 py-4 mr-auto">حفظ</button>
          </div>
      </div>
    </footer>
  )
}
