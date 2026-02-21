

import Settings from '@/components/settings/Settings'
import { auth } from '@/lib/auth'
import { userStatus } from '@/lib/user'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export interface User {
  phoneNumber: string
  username: string
  email: string
  image: string
  createdAt: Date
  [key:string]: any  
}

const page = async () => {

  const session = await auth.api.getSession({headers:await headers()})
  
  if(!session || !session?.user?.email){
    return redirect('/')
  }
  
  const user = await userStatus();

  const userData:User = {
    ...user,
    phoneNumber: user?.phoneNumber || '',
    username: session?.user?.name || '',
    email: session?.user?.email || '',
    image: session?.user?.image || '/default/defaultUser.jfif',
    createdAt: session?.user?.createdAt || new Date(),
  }

  return (
    <Settings userData={userData}   />
  )
}

export default page