
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import { userCloseOne, userStatus } from '@/lib/user'
import DashboardContent from '@/components/dashboard/DashboardContent'
import { userAgentFromString } from 'next/server'

const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) return redirect('/')

  const user = await userStatus()
  const closeOneData = await userCloseOne()

  return <DashboardContent user={user} closeOneData={closeOneData} username={session?.user?.name ||"User"} />
}

export default page