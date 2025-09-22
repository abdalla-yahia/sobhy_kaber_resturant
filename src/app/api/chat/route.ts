import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();
    try {
        
    
  // OpenAI API
const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
  },
  body: JSON.stringify({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: message }],
  }),
});

  const data = await res.json();
  console.log(data)
  const reply = await data.choices?.[0]?.message?.content ||  "معذرة، لم أفهم سؤالك.";

  return NextResponse.json({ reply });
  } catch (error) {
        return NextResponse.json({message:"Some Thing Went Wrong",error,status:500},{status:500})
    }
}
