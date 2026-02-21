import { auth } from "@/lib/auth";
import AssistantPage from "./Assistant"
import './assistant.css'
import { headers } from "next/headers";
import { redirect } from "next/navigation";
const page = async() => {
  //  const session = await auth.api.getSession({headers:await headers()})
  
  //   if (!session) return redirect('/');
  return (
  <AssistantPage />
  )
}

export default page