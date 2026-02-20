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
      <SelectTrigger>
        <SelectValue placeholder="Select Mode"  />
      </SelectTrigger>
      <SelectContent className="z-1001 sm:text-sm ">
        {userModeOfTransport.map((service, idx) => (
          <SelectItem className='capitalize' value={service} key={idx}>
            {icon[service]} {service}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default ModeOfTransport