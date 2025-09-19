import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { TokenInterFace } from "@/Interfaces/UserInterfaces";
import { prisma } from "@/Libs/Prisma/Prisma_Client";

/**
 * @access Same User Or Admin
 * @method GET
 * @param id
 * @path '~/api/users/[id]'
 * @returns User
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    //Get Token From Header
    const cookie = request.cookies.get("authToken");
    if (!cookie) {
      return NextResponse.json(
        { message: "You Dont Allow To GEt This User" },
        { status: 401 }
      );
    }
    const token = cookie?.value;
    const UserFromToken = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as TokenInterFace;
    //Check If User Existes On DB
    const IsExestes = await prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        email: true,
        gender: true,
        image: true,
        address: true,
        createdAt: true,
      },
    });
    if (!IsExestes) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }
    //Check If Same User Or Admin Are Get This User
    if (UserFromToken.id !== id && UserFromToken?.role !== "ADMIN") {
      return NextResponse.json(
        { message: "You Are Not Have Authorization To GEt User" },
        { status: 403 }
      );
    }
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    return NextResponse.json(
      { message: "Get User Successfully", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Faild To Fetch A User", error },
      { status: 400 }
    );
  }
}



/**
 * @access Same User Or Admin
 * @method DELETE
 * @param id
 * @path '~/api/users/[id]'
 * @returns User
 */

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params;
    const cookie = request.cookies.get("authToken");
    if (!cookie) {
      return NextResponse.json(
        { message: "You Are Not Allow To Get This User" },
        { status: 401 }
      );
    }
    const token = cookie?.value;
    const UserFromToken = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as TokenInterFace;
    //Check If User Is Exestes
    const IsExestes = await prisma.user.findUnique({ where: { id: id } });
    if (!IsExestes) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }
    //Check If This User Are Same User Or Admin
    if (UserFromToken?.id !== id && UserFromToken?.role !== "ADMIN") {
      return NextResponse.json(
        { message: "You Are Not Allowed To Delete User" },
        { status: 403 }
      );
    }
    await prisma.user.delete({ where: { id: id } });
    return NextResponse.json(
      { message: "User Deleted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Faild To Delete This User", error },
      { status: 500 }
    );
  }
}
