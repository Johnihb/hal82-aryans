import useUserStore from "@/store/userStore";
import { useEffect, useRef, useState } from "react";
import { Circle, Marker, Popup, Tooltip, useMap } from "react-leaflet";



const UserPosition = () => {
  const map = useMap();
  const setUserPosition = useUserStore((state) => state.setUserLocation);
  const userPosition = useUserStore((state) => state.userLocation);
  const [hasLocated, setHasLocated] = useState(false);
  const [isLocating, setIsLocating] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const locatedRef = useRef(false);

  useEffect(() => {
    let watchId: number | undefined = undefined;
    let leafletHandlersSet = false;

    const handleLocationFound = (e: L.LocationEvent) => {
      const { lat, lng } = e.latlng;
      setUserPosition([lat, lng]);
      
      if (!locatedRef.current) {
        map.flyTo([lat, lng], 16, {
          animate: true,
          duration: 1.5
        });
        locatedRef.current = true;
        setHasLocated(true);
        setIsLocating(false);
      }
    };

    const handleLocationError = (e: L.ErrorEvent) => {
      console.error('❌ Leaflet failed:', e.message);
      setError(e.message);
      setIsLocating(false);
      setHasLocated(true);
    };

    // Try Navigator first
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        // SUCCESS - Navigator worked!
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
          if(!locatedRef.current){
          map.flyTo([latitude, longitude], 16, {
            animate: true,
            duration: 1.5
          });
          locatedRef.current = true;
          setHasLocated(true);
          setIsLocating(false);
        }
        },
        // FAILURE - Navigator failed, try Leaflet
        (navError) => {
          
          // Clear the failed watchId
          if (watchId !== undefined) {
            navigator.geolocation.clearWatch(watchId);
            watchId = undefined;
          }
          
          // Setup Leaflet handlers
          map.on('locationfound', handleLocationFound);
          map.on('locationerror', handleLocationError);
          leafletHandlersSet = true;
          
          // Try Leaflet locate
          map.locate({ 
            setView: false, 
            enableHighAccuracy: false,
            timeout: 30000,
            maximumAge: 60000,
            watch: true
          });
        },
        {
          enableHighAccuracy: false,
          timeout: 15000,
          maximumAge: 60000
        }
      );
    } else {
      // Geolocation not supported
      setError('Geolocation not supported');
      setIsLocating(false);
    }

    // Cleanup function
    return () => {
      // Clear Navigator watch if it exists
      if (watchId !== undefined) {
        navigator.geolocation.clearWatch(watchId);
      }
      
      // Remove Leaflet listeners if they were set
      if (leafletHandlersSet) {
        map.off('locationfound', handleLocationFound);
        map.off('locationerror', handleLocationError);
        map.stopLocate();
      }
    };
  }, [map, setUserPosition]);

  // Loading state
  if (isLocating) {
    return (
      <div 
        style={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          background: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}
      >
        📍 Getting your location...
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div 
        style={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          background: '#ff6b6b',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          fontSize: '14px',
          textAlign: 'center'
        }}
      >
        ⚠️ Could not get location. Using default position.
      </div>
    );
  }

  // Don't render marker until location is found
  if (!hasLocated) {
    return null;
  }

  return (
    <>
      <Circle 
        center={userPosition} 
        radius={25} 
        fillColor="red"
        weight={0}
        fillOpacity={0.4}
      >
        <Tooltip>Your Location</Tooltip>
      </Circle>
      <Marker position={userPosition} title="Your Location">
        <Popup>You are here! 📍</Popup>
      </Marker>
    </>
  );
};

export default UserPosition;