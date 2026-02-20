import { Circle, Marker, Popup, Tooltip } from 'react-leaflet'
import {Place} from '../map-client'
import { greenIcon } from '../_lib/icon'
import useUserStore from '@/store/userStore'

const MarkerComponent = ({service }: {service:Place }) => {

  const setUserDestination = useUserStore (state=> state.setUserDestination) 
  
  const handleChangeDestination = ()=>{
      setUserDestination([parseFloat(service.lat), parseFloat(service.lon)])
  }

  

  return (
   
  <Circle 
    eventHandlers={
      {
        click:handleChangeDestination
      }
    }
    center={[parseFloat(service.lat), 
    parseFloat(service.lon)]} radius={30} 
    color='red' 
    opacity={0.5} 
   >

    <Tooltip>{service.name}</Tooltip>
    
      <Marker 
        // eventHandlers={{
        //   click:handleChangeDestination
        // }}
        position={[parseFloat(service.lat), parseFloat(service.lon)]} 
        icon={greenIcon}
        title={service.name}
      >
      <Popup>{service.name }</Popup>
      </Marker>
    </Circle>
  )
}

export default MarkerComponent