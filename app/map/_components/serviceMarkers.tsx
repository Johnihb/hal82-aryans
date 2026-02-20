import useLeafletStore from '@/store/leafletStore'
import Marker from './marker'
const ServiceMarkers = () => {  
  const servicesDetails = useLeafletStore((state) => state.servicesDetails)
  if(!servicesDetails) return null

  return (
   <div>
    {
      servicesDetails.map((service) => <Marker service={service} key={service.id} />)
    }
   </div>
  )
}

export default ServiceMarkers