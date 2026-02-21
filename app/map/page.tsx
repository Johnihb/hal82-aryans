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
  <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 my-3 px-3 sm:px-0 sm:justify-end" >
      <div className="flex-1 sm:flex-none"><SelectServices /></div>
      <div className="flex-1 sm:flex-none"><ModeOfTransport /></div>
      <div className="flex-1 sm:flex-none"><LoadMore /></div>
  </div>
        <MapClient />
        
        
       { serviceDetails && <Details services={serviceDetails} />}
  </>
  
  )
}

export default Page