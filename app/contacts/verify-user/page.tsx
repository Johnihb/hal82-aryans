import VerifyCode from '@/components/contact/codeVerification'
import { auth } from '@/lib/auth';
import { userStatus } from '@/lib/user';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async() => {
  const Session = await auth.api.getSession({
    headers: await headers()
  })
  
    
    if(!Session){
      return redirect('/')
    }
    const user = await userStatus();
    const phoneNumber = user?.phoneNumber || '';  
    
    return (
      <VerifyCode phoneNumber={phoneNumber}/>
  )
}

export default page