import  Jwt  from "jsonwebtoken";
import { prisma } from "@/Libs/Prisma/Prisma_Client";
import { UpdataMealValidation } from "@/Validations/MealValidation";
import { NextRequest, NextResponse } from "next/server";
import { TokenInterFace } from "@/Interfaces/UserInterfaces";

/**
 * @access Every One
 * @method GET
 * @param slug 
 * @path '~/api/Meals/[slug]'
 * @returns  One Meal
 */


export async function GET(_:unknown,{params}:{params:Promise<{slug:string}>}):Promise<NextResponse>{
    try {
        const {slug} = await params;
        // Check If Meal Is Existes
        const IsExistes = await prisma.meals.findUnique({where:{slug}})
        if(!IsExistes){
            return NextResponse.json({message:'Meal Not Found'},{status:404})
        }
        // Get Meal
        const Meal = await prisma.meals.findUnique({where:{slug},
        include:{
                category:{
                    select:{
                        id:true,
                        title:true,
                        image:true
                    },
                },
                translations:{
                    select:{
                        id:true,
                        name:true,
                        mealId:true,
                        LocalId:true
                    }
                }         
            }})
        return NextResponse.json({message:'Get Meal Successfully',Meal,status:200},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Faild To Get Meal',error},{status:500})
    }
}


/**
 * @access Only Admins
 * @method POST
 * @param slug 
 * @path '~/api/Meals/[slug]'
 * @returns  Updated Meal
 */

export async function POST(request:NextRequest,{params}:{params:Promise<{slug:string}>}):Promise<NextResponse>{
    try {
        //Get Data From Body
        const data = await request.json()
        // Get Slug
        const {slug} = await params;
        //Check If User Is Admin
        const cookie = request.cookies.get('authToken')
        if(!cookie){
            return NextResponse.json({message:'You Are Not Login'},{status:401})
        }
        const token = cookie?.value;
        const Decode = Jwt.verify(token,process.env.JWT_SECRET_KEY as string) as TokenInterFace
        if(!Decode){
            return NextResponse.json({message:'You Are Not Login'},{status:401})
        }
        //Check If User Role Is Admin
        if(Decode?.role !== 'ADMIN'){
            return NextResponse.json({message:'These permissions are restricted to admins only'},{status:403})
        }
        //Check If Is Meal Existes
        const IsExistes = await prisma.meals.findUnique({where:{slug}})
        if(!IsExistes){
            return NextResponse.json({message:'Meal Not Found'},{status:404})
        }
        //Check Validation Of Data
        const Validation = UpdataMealValidation.safeParse(data)
        if(!Validation.success){
            return NextResponse.json({message:'Data Not Valide'},{status:400})
        }
        //Update Meal
        const Meal = await prisma.meals.update({
            where:{slug},
            data:Validation?.data
        })
        return NextResponse.json({message:'Meal Updated Successfully',Meal,status:201},{status:201})
    } catch (error) {
        return NextResponse.json({message:'Faild To Update Meal',error},{status:500})
    }
}


/**
 * @access Only Admins
 * @method DELETE
 * @param slug 
 * @path '~/api/Meals/[slug]'
 * @returns  null
 */

export async function DELETE(request:NextRequest,{params}:{params:Promise<{slug:string}>}):Promise<NextResponse>{
    try {
        // Get Slug
        const {slug} = await params;
        //Check If User Is Logein
        const cookie = request.cookies.get('authToken')
        if(!cookie){
            return NextResponse.json({message:'You Are Not Login'},{status:401})
        }
        const token = cookie?.value ;
        const Decode = Jwt.verify(token, process.env.JWT_SECRET_KEY as string) as unknown as TokenInterFace
        if(!Decode){
            return NextResponse.json({message:'You Are Not Login'},{status:401})
        }
        //Check If User Role Is Admin
        if(Decode?.role !== 'ADMIN'){
            return NextResponse.json({message:'These permissions are restricted to admins only'},{status:403})
        }
        //Check If Is Meal Existes
        const IsExistes = await prisma.meals.findUnique({where:{slug}})
        if(!IsExistes){
            return NextResponse.json({message:'Meal Not Found'},{status:404})
        }
        //Delete Meal
        await prisma.meals.delete({where:{slug}})
        return NextResponse.json({message:'Meal Deleted Successfully',status:200},{status:200})
    } catch (error) {
        return NextResponse.json({message:'Faild To Delete Meal',error},{status:500})
    }
}