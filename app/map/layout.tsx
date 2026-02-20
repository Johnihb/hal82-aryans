import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'



// type Session = 
const layout = async({children}:{children:React.ReactNode}) => {
  const Session = await auth.api.getSession({
    headers: await headers()
  })

  
  if(!Session){
    return redirect('/')
  }

  return (
    <>{children}</>
  )
}

export default layout