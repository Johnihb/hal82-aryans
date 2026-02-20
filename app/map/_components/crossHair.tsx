import useUserStore from "@/store/userStore"
import { LocateFixed } from "lucide-react"
import { useMap } from "react-leaflet"

const CrossHair = ()=>{

  const map = useMap()

  const userPosition = useUserStore((state)=> state.userLocation)
  if(!userPosition){
    return 
  }

  const handleClick=()=>{
    map.flyTo(userPosition,18,{
      animate:true,
      duration:5
    })
  }
  return <button className=' z-999 size-10 absolute top-28    right-5 bg-gray-50 shadow-md ' onClick={handleClick}>
  <LocateFixed className='m-auto'  />
  </button>
}

export default CrossHair