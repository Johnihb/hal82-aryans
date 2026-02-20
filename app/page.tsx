import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import HeroSection from "../components/hero-section-demo-1";
import { redirect } from "next/navigation";



export default async function Home() {

    const session= await auth.api.getSession({
    headers : await headers()
  })

  if(session && session?.user) return redirect('/dashboard')

  return  <HeroSection />
  
}
