import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
 let data;
 try {
   data = await req.json();
 } catch (error) {
  return NextResponse.json({
    message:"Invalid request body"
  },{
    status:400
  })
 }
  const session = await auth.api.getSession({headers:await headers()})
  
  if(!session){
    return NextResponse.json({message:"Unauthorized"},{status:401})
  }
  
  if (!data?.phoneNumber || !data?.code) {
    return NextResponse.json({message:"Missing required fields"},{status:400})
  }

  const userPhoneNumber = data?.phoneNumber.startsWith('+') ? data.phoneNumber : `+${data.phoneNumber}`

  const response = await  prisma.closeOne.findFirst({
    where:{
      userId:session.user.id,
      phoneNumber:userPhoneNumber
    },
    select:{
      verificationCode:true,
      updatedAt:true,
      isVerified:true,
      id:true
    }
  })
  if(!response){
    return NextResponse.json({message:"Unauthorized"},{status:401})
  }
  if(response.isVerified){
    return NextResponse.json({message:"Already Verified"},{status:403})
  }

  if(response?.updatedAt.getTime()+15*60*1000 < Date.now())return NextResponse.json({message:"Unauthorized"},{status:401}) 
  
    if(response.verificationCode !== Number(data.code))return NextResponse.json({message:"Unauthorized"},{status:401})


// Then update using the correct ID
await prisma.closeOne.update({
  where:{ id: response.id },
  data:{ isVerified:true , verificationCode:null }
})

  return NextResponse.json({message:"Success"},{status:200})
}