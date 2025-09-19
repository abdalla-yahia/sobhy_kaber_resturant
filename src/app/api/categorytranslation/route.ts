import { prisma } from "@/Libs/Prisma/Prisma_Client";
import { NextRequest, NextResponse } from "next/server";
import Jwt from 'jsonwebtoken';
import { TokenInterFace } from "@/Interfaces/UserInterfaces";

/**
 * @access All Users
 * @method GET
 * @param id 
 * @path '~/api/CategoryTranslation'
 * @returns  Get All CategoryTranslation
 */

export async function GET(){
    try {
        const CategoryTranslation = await prisma.categoryTranslation.findMany({})
        return NextResponse.json({message:'Get All CategoryTranslation Successfully',CategoryTranslation},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Faild To Get All CategoryTranslation',error},{status:500})
    }
}

/**
 * @access Only Admins
 * @method POST
 * @param id 
 * @path '~/api/CategoryTranslation'
 * @returns  Create Anew CategoryTranslation
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
            
            //Create Anew CategoryTranslation
            const CategoryTranslation = await prisma.categoryTranslation.createMany({
                data:translations,
                skipDuplicates: true
            })
            return NextResponse.json({message:'CategoryTranslation Created Successfully',CategoryTranslation},{status:201})
    } catch (error) {
        return NextResponse.json({message:'Faild To Create New CategoryTranslation',error},{status:500})
    }
}