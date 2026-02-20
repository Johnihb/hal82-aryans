'use server'
import { redirect } from "next/navigation"
import { auth } from "../auth"
import { headers } from "next/headers"



export const signUp= async(provider?:'google'|'github')=>{
  const {url} = await auth.api.signInSocial({
    body:{
      provider:provider || "google",
      callbackURL:"/dashboard"
      
    },
  })

  if(url){
   redirect(url)
  }
}

export const signOut = async ()=>{
  return  await auth.api.signOut({
    headers:await headers()
  });

}

