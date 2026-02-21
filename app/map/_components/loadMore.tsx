import { Button } from '@/components/ui/button'
import useLeafletStore from '@/store/leafletStore'
import { HardDriveDownload } from 'lucide-react'
import React from 'react'

const LoadMoreButton = () => {
  const loadMoreService = useLeafletStore(state=>state.updateServicesDetails)
  const handleClick = async()=>{
    try {
      await loadMoreService()
    } catch (error) {
      console.warn("Unable to load more services. Please try again later.",error)
      
    }


  }

  return (
    <Button variant={'outline'} className='font-mono hover:bg-gray-200 w-full sm:w-auto py-5 sm:py-2 px-3 text-base sm:text-sm h-auto sm:h-10'  onClick={handleClick}><HardDriveDownload className='my-auto' /> Load More</Button>
  )
}

export default LoadMoreButton