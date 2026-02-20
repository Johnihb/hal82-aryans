'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import useLeafletStore from "@/store/leafletStore";
import useUserStore from "@/store/userStore";
import { BriefcaseMedical, ClipboardPlus, Hospital } from "lucide-react";


  export interface Place {
    lat: string;
    lon: string;
    display_name: string;
    osm_id: string;
    name: string;
    [key: string]: string;
  }



const Button = ()=>{
  
  const icon: { [key: string]: React.ReactNode } = {
    hospital : <Hospital />,
    clinic : <BriefcaseMedical />,
    pharmacy : <ClipboardPlus />
  }


  const setService = useLeafletStore((state)=> state.setService)
  const setServicesDetails = useLeafletStore((state)=> state.updateServicesDetails)
  const availableServices = useLeafletStore((state)=> state.availableServices)

  const userPosition = useUserStore((state)=> state.userLocation)
  if(!userPosition){
    return null
  }


  const handleClick = async(value: string)=>{
    if(!value ){
      return 
    }

    setService(value)
    setServicesDetails()
  }
  
  return (
    <Select onValueChange={handleClick} >
      <SelectTrigger>
        <SelectValue placeholder="Select Service"  />
      </SelectTrigger>
      <SelectContent className="z-1001 sm:text-sm ">
        {availableServices.map((service, idx) => (
          <SelectItem className="capitalize" value={service} key={idx}>
           {icon[service]} {service}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  
  
)
}

export default Button