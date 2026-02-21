'use client'

import { Button } from '@/components/ui/button'
import useUserStore from '@/store/userStore'
import { Mail } from 'lucide-react'
import React from 'react'

const SMSButton = () => {

  const userLocation:[number, number] = useUserStore(state=>state.userLocation)
  const userDestinationLocation:[number|null, number|null] = useUserStore(state=>state.userDestination)
  let userData =userDestinationLocation[0] && userDestinationLocation[1] ? { userLocation, userDestinationLocation}: { userLocation }


  const handleClick=async(e:React.MouseEvent)=>{
    try {
      const response = await fetch('/api/send-alert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      })
      
      console.log('response' , response)
      
      // Check if response has content before trying to parse JSON
      const contentType = response.headers.get('content-type')
      console.log('Content-Type:', contentType)
      
      if (!response.ok) {
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json()
          console.error('API Error:', errorData)
        } else {
          const errorText = await response.text()
          console.error('API Error (non-JSON):', errorText)
        }
        return
      }
      
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json()
        console.log('Success:', data)
      } else {
        const text = await response.text()
        console.log('Success (non-JSON):', text)
      }
    } catch (error) {
      console.error('Fetch Error:', error)
    }
  }

  
  return (
    <>
      <Button variant={'destructive'} onClick={handleClick} className='cursor-pointer hover:bg-red-700'>
        <Mail className="h-4 w-4 mr-2"/>
        Send SMS
      </Button>
    </>
  )
}

export default SMSButton
