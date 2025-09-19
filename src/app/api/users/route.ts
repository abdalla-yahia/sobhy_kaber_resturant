import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '@/Libs/Prisma/Prisma_Client';
import { TokenInterFace } from "@/Interfaces/UserInterfaces";
import { CreateUserValidation } from '@/Validations/UserValidations';

/**
 * @method GET
 * @access Admin
 * @path '~/api/user'
 * @returns All users
 *
 */


export async function GET(request:NextRequest){
    try {
    // //Check Cookie
    const cookie = request?.cookies.get('authToken')
    if(!cookie){
        return NextResponse.json({message:"NoT Have Permision To Fetch All User"},{status:401})
    }
    const AdminFromToken = jwt.verify(cookie?.value,process.env.JWT_SECRET_KEY as string) as TokenInterFace
    //Check If Is Admin
    if(AdminFromToken?.role !== 'ADMIN'){
        return NextResponse.json({message:'These permissions are restricted to admins only'},{status:403})
    }

    const users = await prisma.user.findMany({})
        return NextResponse.json({message:'Get All Users Successfully',users,status:200},{status:200})

    } catch (error) {
        return NextResponse.json({message:'Faild To Get All Users',error,status:500},{status:500})
    }
}



/**
 * @access Every One
 * @method Post
 * @param NoParam 
 * @path '~/api/users'
 * @returns New User
 */

export async function POST(request:NextRequest){
    try {
        const data = await request?.json()
        //Check Validation Of Data
        const Validation = CreateUserValidation.safeParse(data)
        if(!Validation?.success){
            return NextResponse.json({message:Validation?.error?.issues?.map(e=>e.message)?.join(', ')},{status:400})
        }
        // Generate HashPassword
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(Validation?.data?.password,salt)
        Validation.data.password = hashedPassword
        const user = await prisma.user.create({
            data:Validation?.data
        })
        return NextResponse.json({
            message:'Create Anew User Successfully',        
            user
        },
        {   
            status:201,
        }
    )
    } catch (error) {
        return NextResponse.json({message:'Faild To Create A New User!!',error})
    }
}