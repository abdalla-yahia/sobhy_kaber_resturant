"use client";
import Chat_Container_Hook from "@/Hooks/Home/Chat/Chat_Container_Hook";
import Image from "next/image";


export default function ChatBot() {
const  {t,isOpen,setIsOpen,setTimer,messages,input,setInput,sendMessage} =Chat_Container_Hook()
return (
    <div className={`${isOpen ? 'h-[500px]':'h-[0]'} transition-all duration-700 relative flex flex-col bg-white/90 w-full max-w-md mx-auto border rounded-lg p-4 `} >
      <div className="flex-1 overflow-y-auto mb-2 space-y-2">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
            <p className={`inline-block p-2 rounded-lg ${m.role === "user" ? "bg-blue-200" : "bg-gray-200"}`}>
              {m.content}
            </p>
          </div>
        ))}
      </div>
      <div className="flex gap-2 pb-5">
        <input
          value={input}
          onChange={(e) => {setInput(e.target.value);setTimer(0)}}
          className="flex-1 border rounded-lg p-2"
          placeholder={t('askme')+'...'}
        />
        <button onClick={sendMessage} className="bg-primary text-white rounded-lg px-4">{t('send')}</button>
      </div>
      <Image onClick={()=>{setIsOpen(!isOpen);setTimer(0)}} className=" absolute -top-25 -left-10" src={'https://static.vecteezy.com/system/resources/previews/058/693/450/large_2x/cartoon-robot-presenting-data-with-green-eyes-and-white-background-free-png.png'} alt="robot-image" width={150} height={150}/>
    </div>
  );
}
