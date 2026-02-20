'use client'
import useUserStore from '@/store/userStore';
import { useEffect, useState } from 'react'

const draft = () => {
  if(typeof window === 'undefined') {
    
    console.error('Please kindly use a device that supports geolocation or enable location services in your browser settings.');
    return null;
  }
  

  const setUserPostion = useUserStore((state) => state.setUserLocation);

  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);


  useEffect(()=>{
    let mounted: boolean = true;

    navigator.geolocation.getCurrentPosition((position) => {
      if (!mounted) return;

      setUserPostion([position.coords.latitude, position.coords.longitude]);
      setUserLocation([position.coords.latitude, position.coords.longitude]);
    });
    
    return () => {
      mounted = false;
    };
  },[])

  return null;
}

export default draft