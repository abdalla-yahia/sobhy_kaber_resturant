'use client'
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function Chat_Container_Hook() {
      const [messages, setMessages] = useState<{role: string; content: string}[]>([]);
  const [input, setInput] = useState("");
  const [isOpen,setIsOpen]=useState(false);
  const [timer,setTimer] = useState(0)
  const t = useTranslations('homepage.chat')
  const sendMessage = async () => {
    if (!input) return;

    setMessages([...messages, { role: "user", content: input }]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();

    setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    setInput("");
  };
  //Set Interval Timer
useEffect(() => {
  const interval = setInterval(() => {
      setTimer((prev) => prev + 1); 
  }, 1000);
  return () => clearInterval(interval);
}, [input]);
//Close Bot After Timer Finsh
useEffect(()=>{
    if(timer >= 10){
        setIsOpen(false)
        setTimer(0)
      }
},[timer])
  return {t,isOpen,setIsOpen,setTimer,messages,input,setInput,sendMessage}
}
