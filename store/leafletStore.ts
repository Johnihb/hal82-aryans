import { Place } from '@/app/map/map-client'
import { servicesNearUser } from '@/lib/action/map'
import {create} from 'zustand'
import useUserStore from './userStore'

interface MapState{
  availableServices:string[],//service that we can provide
  selectedService:string
  servicesDetails:Place[] |null//responses
  setService:(service:string)=>void//to update and mutate the value of selected service
  updateServicesDetails:()=>void//!used for both intial load and load more logic
  currentRadius:number|null//response from servicenearUser
  setCurrentRadius:(radius:number)=>void
  canLoadMore:boolean
  setCanLoadMore :(value:number)=>void
}




const useLeafletStore = create<MapState>((set,get)=>({
  
  availableServices:['hospital','clinic', 'pharmacy'],
  selectedService: '',
  servicesDetails: [],
  setService:(service:string)=>{
    
    if(service !== get().selectedService){
      set({currentRadius:null})
    }
    set({selectedService:service})
  },
    currentRadius:null,
    setCurrentRadius:(radius:number)=>set({currentRadius:radius}),
    canLoadMore:true,
    setCanLoadMore:(value:number)=>set({canLoadMore:value<=5000}),

  updateServicesDetails:async()=>{
    try {
    
      const userLocation = useUserStore.getState().userLocation;
       if (!userLocation) {
         set({ servicesDetails: null });
         return;
       }
      const availableServicesNearUser = await servicesNearUser(get().selectedService ,userLocation,  get().currentRadius);

      if(!availableServicesNearUser  ) {
        set({ servicesDetails:null})
        return 
      }
      
      if("error" in availableServicesNearUser){
      get().setCurrentRadius(availableServicesNearUser?.currentRadius as number)
      get().setCanLoadMore(availableServicesNearUser?.currentRadius as number)
      set({ servicesDetails:null})
      return  
    }

    if(availableServicesNearUser.place.length === 0){
       set({ servicesDetails:null})
      return
    }

      set({currentRadius:availableServicesNearUser.currentRadius , servicesDetails:availableServicesNearUser.place})
      get().setCanLoadMore(availableServicesNearUser?.currentRadius)


      useUserStore.getState().setUserDestination([
        parseFloat(availableServicesNearUser.place[0].lat),
        parseFloat(availableServicesNearUser.place[0].lon)
      ])
      

    } catch (error) {
      console.warn("Internal Server Error")
       set({ servicesDetails: null });
    }

  },

})
)

export default useLeafletStore
