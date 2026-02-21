import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import useUserStore from '@/store/userStore'
import { Ambulance, Bike, Footprints, HardDrive } from 'lucide-react'
import React, { ReactNode } from 'react'

const ModeOfTransport = () => {

  const userModeOfTransport = useUserStore((state) => state.modeOfTransports)
  const setUserModeOfTransport = useUserStore((state) => state.setUserModeOfTransport)


  const icon: { [key: string]: ReactNode } = {
    driving : <Ambulance />,
    foot : <Footprints />,
    cycling : <Bike />
  }
  const handleClick = async(value: string)=>{
    if(!value ) return
    setUserModeOfTransport(value)
  }


  return (
  <Select  onValueChange={handleClick} >
      <SelectTrigger className="py-5 sm:py-2 px-3 text-base sm:text-sm h-auto sm:h-10 w-full">
        <SelectValue placeholder="Select Mode"  />
      </SelectTrigger>
      <SelectContent className="z-1001 sm:text-sm max-h-64 sm:max-h-56">
        {userModeOfTransport.map((service, idx) => (
          <SelectItem className='capitalize py-3 sm:py-2 px-2 text-base sm:text-sm cursor-pointer' value={service} key={idx}>
            {icon[service]} {service}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default ModeOfTransport