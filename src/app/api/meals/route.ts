import { prisma } from "@/Libs/Prisma/Prisma_Client";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { TokenInterFace } from "@/Interfaces/UserInterfaces";
import { CreateMealValidation } from "@/Validations/MealValidation";
import slugify from "slugify";
import { getLocale } from "next-intl/server";

/**
 * @method GET
 * @access All Visetors
 * @path '~/api/Meals'
 * @returns All Meals
 */


export async function GET(){
    try {
        const meals = await prisma.meals.findMany({
            include:{
                category:{
                    include:{
                        translations:{
                    select:{
                        id:true,
                        name:true,
                        categoryId:true,
                        LocalId:true
                    }
                }
                    }
                },
                translations:{
                    select:{
                        id:true,
                        name:true,
                        mealId:true,
                        LocalId:true
                    }
                }
            }
        })
        return NextResponse.json({message:'GEt All Meals Successfully',meals,status:200},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Faild To Get All Meals',status:500,error},{status:500})
    }
}

/**
 * @method POST
 * @access Only Admins
 * @path '~/api/Meals'
 * @returns New Meal
 */

export async function POST(request:NextRequest){
    // const locale = await getLocale()
    try {
        const data =await request.json()
         //Check Cookie
            const cookie = request?.cookies.get('authToken')
            if(!cookie){
                return NextResponse.json({message:"NoT Have Permision To Fetch All User"},{status:401})
            }
            const AdminFromToken = jwt.verify(cookie?.value,process.env.JWT_SECRET_KEY as string) as TokenInterFace
            //Check If Is Admin
            if(AdminFromToken?.role !== 'ADMIN'){
                return NextResponse.json({message:'These permissions are restricted to admins only'},{status:403})
            }
            const Validation  = CreateMealValidation.safeParse(data)
            if(!Validation?.success){
            return NextResponse.json({message:'Faild To Create A New Meal',status:401},{status:401})
            }
            //Create Slug
            const baseSlug = slugify(Validation.data.title, {
            locale: 'ar',
            replacement: "-",
            });
            //Check Existeng
            const existingProducts = await prisma.meals.findMany({
            where: { slug: { startsWith: baseSlug } },
            select: { slug: true },
            });

            // Create Unique Slug
            let slug = baseSlug;
            if (existingProducts.length > 0) {
            slug = `${baseSlug}-${existingProducts.length + 1}`;
            }
            //Create Anew Meal
        const meal = await prisma.meals.create({
            data:{
                ...Validation?.data,
                slug
            }

        })
     return NextResponse.json({message:'Create Meal Successfully',meal,status:201},{status:201})

    } catch (error) {
        return NextResponse.json({message:'Faild To Create A New Meal',error,status:500},{status:500})
    }
}