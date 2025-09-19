import { prisma } from "@/Libs/Prisma/Prisma_Client";
import { NextRequest, NextResponse } from "next/server";
import Jwt from 'jsonwebtoken';
import { TokenInterFace } from "@/Interfaces/UserInterfaces";

/**
 * @access All Users
 * @method GET
 * @param id 
 * @path '~/api/Mealtranslation'
 * @returns  Get All Mealtranslation
 */

export async function GET(){
    try {
        const Mealtranslation = await prisma.mealTranslation.findMany({})
        return NextResponse.json({message:'Get All Mealtranslation Successfully',Mealtranslation},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Faild To Get All Mealtranslation',error},{status:500})
    }
}

/**
 * @access Only Admins
 * @method POST
 * @param id 
 * @path '~/api/Mealtranslation'
 * @returns  Create Anew mealtranslation
 */

export async function POST(request:NextRequest){
    try {
        const  {translations}  = await request.json()
            //Get Admin From Cookie
            const cookie = request.cookies.get('authToken')
            if(!cookie){
                return NextResponse.json({message:'You Are Not Login'},{status:401})
            }
            const token = cookie?.value;
            const Decode = Jwt.verify(token,process.env.JWT_SECRET_KEY as string) as TokenInterFace
            if(!Decode){
            return NextResponse.json({message:'You Are Not Login'},{status:402})
            }
            if(Decode?.role !== 'ADMIN'){
                return NextResponse.json({message:'These permissions are restricted to admins only'},{status:403})
            }
            
            //Create Anew mealtranslation
            const mealtranslation = await prisma.mealTranslation.createMany({
                data:translations,
                skipDuplicates: true
            })
            return NextResponse.json({message:'mealtranslation Created Successfully',mealtranslation},{status:201})
    } catch (error) {
        return NextResponse.json({message:'Faild To Create New mealtranslation',error},{status:500})
    }
}