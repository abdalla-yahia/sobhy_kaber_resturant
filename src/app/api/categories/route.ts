import { prisma } from "@/Libs/Prisma/Prisma_Client";
import { NextRequest, NextResponse } from "next/server";
import Jwt from 'jsonwebtoken';
import { CreateCategoryValidation } from "@/Validations/CategoryValidation";
import { TokenInterFace } from "@/Interfaces/UserInterfaces";

/**
 * @access All Users
 * @method GET
 * @param id 
 * @path '~/api/categories'
 * @returns  Get All Categories
 */

export async function GET(){
    try {
        const categories = await prisma.category.findMany({
            include:{
                meals:{
                    include:{
                        translations:{
                    select:{
                        id:true,
                        name:true,
                        mealId:true,
                        LocalId:true
                    }
                }
                    }
                },
                translations:{
                    select:{
                        id:true,
                        name:true,
                        categoryId:true,
                        LocalId:true
                    }
                }
            }
        })
        return NextResponse.json({message:'Get All Categories Successfully',categories},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Faild To Get All Categories',error},{status:500})
    }
}

/**
 * @access Only Admins
 * @method POST
 * @param id 
 * @path '~/api/categories'
 * @returns  Create Anew Category
 */

export async function POST(request:NextRequest){
    try {
        const data = await request.json()
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
            //Check Validation Of Data 
            const Validation = CreateCategoryValidation.safeParse(data)
            if(!Validation?.success){
                return NextResponse.json({message:'Data Not Valide',error:Validation.error.issues?.map(e=>e.message).join(', ')})
            }
            //Create Anew Category
            const category = await prisma.category.create({
                data:Validation?.data
            })
            return NextResponse.json({message:'Category Created Successfully',category},{status:201})
    } catch (error) {
        return NextResponse.json({message:'Faild To Create New Category',error},{status:500})
    }
}