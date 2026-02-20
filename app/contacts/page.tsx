import PhoneVerification from "@/components/contact/phoneVerification";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import './contact.css';
import { userCloseOne, userStatus } from "@/lib/user";
import AddCloseOne from "@/components/contact/AddCloseOne";

// Child Component: Phone Verification Flow


// Parent Page Component
const Page = async() => {
  const session = await auth.api.getSession({headers:await headers()})

  
  if(!session){
     return redirect('/')
   }
   const user = await userStatus();   
  const closeOneData = await userCloseOne();
   return (
 <>
    { !user.isVerified &&<PhoneVerification />}
    {
      user.isVerified && <AddCloseOne initialData={closeOneData} />
    }
 </>
)
};

export default Page;