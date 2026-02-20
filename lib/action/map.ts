'use server'
import { Place } from "@/app/map/map-client"

export const servicesNearUser = async (service:string ,location:[number ,number],radius:number|null):Promise<{place:Place[] , currentRadius:number}|{error:string , currentRadius?:number}>=>{
  const [lat , lon]= location
  let currentRadius = radius ?? 1000 ;

  // Validate coordinates
  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
    return { error: "Invalid coordinates provided." }
  }
  


  try {
    while(currentRadius <= 5000) {
      
      
      // output json maximum  time to fetch query 30s , amenity = service name , around : radius in meters
      const OSMQuery =`[out:json][timeout:30];(node["amenity"="${service}"](around:${ currentRadius},${lat},${lon});way["amenity"="${service}"](around:${ currentRadius},${lat},${lon});relation["amenity"="${service}"](around:${currentRadius},${lat},${lon}););out body center;`
      

      try {
        
        const overpassOSM = await fetch('https://overpass-api.de/api/interpreter', {
          method:"POST",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            "User-Agent": `Emergen/1.0 (${process.env.USER_AGENT_EMAIL})`
          },  
          body: OSMQuery,
          signal:AbortSignal.timeout(30000)
        })
      
        


        if(overpassOSM.ok ){
        const OSMresponse = await overpassOSM.json()   

        if(OSMresponse.elements?.length > 0){
        const data = OSMresponse.elements.map((element:any):Place=>{
        return {
          id: element.id.toString(),
          lat: element.lat ? element.lat.toString() : (element.center ? element.center.lat.toString() : ''),
          lon: element.lon ? element.lon.toString() : (element.center ? element.center.lon.toString() : ''),
          name: element.tags?.name ? element?.tags?.name : `${service} near ${lat},${lon}`,
          serviceCategory: element.tags?.amenity ? element.tags?.amenity : service,
          emergency: element.tags?.emergency ? element?.tags?.emergency : 'no',
          phoneNumber : element?.tags?.phone ?? "Not Provided.",
          website:element?.tags?.website ?? "Not Provided.",
          opening_hours:element?.tags?.opening_hours ?? "Not Provided."
          }
        })
        return {place:data , currentRadius:currentRadius+1000}
      }
     }else{
      console.warn("Sorry no services were found at the radius of "+ currentRadius)
    }
    } catch (fetchError) {
      console.warn(`Fetch failed at ${currentRadius}m:`, fetchError)  
    }
    currentRadius+=1000

    } 
    return {
      error:`Sorry , we weren't able to find services near you.`,
      currentRadius
    }


  } catch (error) {
    console.error("Cannot Get Services.Retry again" , error)
    return {
      error:"Internal server error.Please try again later."
    }
  }
}
