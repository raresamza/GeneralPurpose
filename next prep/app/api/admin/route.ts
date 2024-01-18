import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
    //anything server side
    //hooks are only client side
    const role= await currentRole()
    if (role===UserRole.ADMIN) {
    return new NextResponse(null,{status:200})
    }
    return new NextResponse(null,{status:403})
    
}