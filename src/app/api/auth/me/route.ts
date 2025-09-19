import { NextRequest, NextResponse } from "next/server";
import Jwt from 'jsonwebtoken';
import { TokenInterFace } from "@/Interfaces/UserInterfaces";

export async function GET(request:NextRequest){
    try {
        //Check If Cookie
        const cookie =  request.cookies.get('authToken')
        if(!cookie){
            return NextResponse.json({message:'No User Found'},{status:404})
        }
        const decode = Jwt.verify(cookie?.value,process.env.JWT_SECRET_KEY as string) as TokenInterFace
        if(!decode){
            return NextResponse.json({message:'No User Found'},{status:404})   
        }
        return NextResponse.json({message:'Get Looged User Successfully',user:decode},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Faild To Get Logged User',error},{status:500})
    }
}