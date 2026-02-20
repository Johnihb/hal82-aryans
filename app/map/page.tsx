'use client'
import dynamic from 'next/dynamic'
import SelectServices from './_components/selectServices'
import ModeOfTransport from './_components/modeOfTransport'
import LoadMore from './_components/loadMore'
import Details from './_components/detailsShowing'
import useLeafletStore from '@/store/leafletStore'


// ✅ Good: Dynamic import with ssr: false
// ✅ Add loading state for better UX
const MapClient = dynamic(() => import('./map-client'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <p>Loading map...</p>
    </div>
  )
})

const Page = () => {

  const serviceDetails=useLeafletStore(state=>state.servicesDetails)
  


  return(<>
  <div className="flex justify-end my-3 space-x-2" >
      <SelectServices />
      <ModeOfTransport />
      <LoadMore />
  </div>
        <MapClient />
        
        
       { serviceDetails && <Details services={serviceDetails} />}
  </>
  
  )
}

export default Page