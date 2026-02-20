import { sendOTPToUser } from "@/lib/action/OTP";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async(req:NextRequest)=>{
  
    try {
    const session = await auth.api.getSession({headers:await headers()})
    
    if(!session || !session.user.email|| !session.user.id)return NextResponse.json({message:"Unauthorized"},{status:401})

    let data:{
      phone:string,
      username:string
    } = await req.json()



    const userDetail = await prisma.user.findUnique({where:{id:session?.user.id},select:{phoneNumber:true ,name:true}}) 
    
    if(!userDetail)return NextResponse.json({message:"User not found"},{status:404})
    
    if(data.phone === userDetail.phoneNumber && data.username === userDetail.name)return NextResponse.json({message:"No changes detected"},{status:200})
      

    if(data.phone !== userDetail.phoneNumber){
      try {
        const response = await sendOTPToUser(data.phone,session.user.id)

        if(!response.success) return NextResponse.json({message:"Failed to send verification code"},{status:500})
        } catch (error) {
        return NextResponse.json({message:"Internal server error.Please try again later" , error},{status:500})
      }
    }


    if(data.username !== userDetail.name){


    try {
        const response = await prisma.user.update({
          where:{
            email:session.user.email
          },
          data:{
            name:data.username
          }
        })

        if(!response) return NextResponse.json({message:"Failed to update user"},{status:500})
        } catch (error) {
        return NextResponse.json({message:"Internal server error.Please try again later",error},{status:500})
      }
    }

    return NextResponse.json({message:"User updated successfully"},{status:200})


  } catch (error) {
        return NextResponse.json({message:"Internal server error.Please try again later" ,error},{status:500})

  }
}