'use server'

import { headers } from "next/headers"
import { auth } from "./auth"
import prisma from "./prisma"

export const userStatus=async():Promise<{success:boolean , phoneNumber?:string|null , isVerified?:boolean , verificationCode?:boolean}>=>{
  const session = await auth.api.getSession({headers:await headers()})
  if(!session)return {success:false}
  const user = await prisma.user.findUnique({where:{id:session.user.id},select:{phoneNumber:true,verificationCode:true ,isVerified:true}})

  if (!user ) return {success: false}

  return {success:true , phoneNumber:user?.phoneNumber || null , isVerified:user.isVerified , verificationCode:!!user.verificationCode }
}


export const userCloseOne= async():Promise<{success:boolean , count?:number , userCloseOne?:any}>=>{
  const session = await auth.api.getSession({headers:await headers()})
  if(!session)return {success:false}
  // const count = await prisma.closeOne.count({where:{userId:session.user.id}})
  const [userCloseOne , count] = await Promise.allSettled([
    prisma.user.findUnique({where:{id:session.user.id},
    include:{close_ones:true}
  }
  ),
  prisma.close_ones.count({where:{userId:session.user.id}})])
  
  if (count.status !== 'fulfilled' || count.value === undefined ||userCloseOne.status !== 'fulfilled' || !userCloseOne.value) return {success: false}  
  return {success:true , count:count.value , userCloseOne:userCloseOne.value}
}

export const deleteNumber = async (phoneNumber:string)=>{
  const session = await auth.api.getSession({headers:await headers()})
  if(!session)return
  await prisma.close_ones.deleteMany({where:{userId:session.user.id , phoneNumber}})
}