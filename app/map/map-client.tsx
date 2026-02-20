'use client'
import { Circle, LayerGroup, LayersControl, MapContainer, Marker, Popup, TileLayer, useMap, ZoomControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { defaultIcon } from './_lib/icon';
import CrossHair from './_components/crossHair';
import UserPosition from './_components/userPosition'
import useUserStore from '@/store/userStore';
import ServiceMarker from './_components/serviceMarkers';
import useLeafletStore from '@/store/leafletStore';
import RoutingPath from './_components/routingPath';

export interface Place {
  lat: string;
  lon: string;
  id: string;
  name: string;
  phoneNumber?:string;
  serviceCategory?:string;
  emergency?:string ;
  website?:string;
  opening_hours?:string
}

L.Marker.prototype.options.icon = defaultIcon;



const MapClient = () => {
  const userPosition = useUserStore((state) => state.userLocation);
  const servicesDetails = useLeafletStore((state) => state.servicesDetails);
  if (typeof window !== 'undefined' && !navigator.geolocation) {
    console.warn('Geolocation is not supported by this browser.');
  }



  return (
    <MapContainer 
      center={userPosition}
      zoom={13}
      scrollWheelZoom={true}
      zoomControl={false}
      
      className='mx-auto max-w-screen overflow-hidden min-h-100 relative z-1'
    >
      <ZoomControl position='bottomright' />
      <TileLayer 
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LayersControl position='topright'>
        <LayersControl.BaseLayer checked name='Street'>
          <TileLayer 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name='Satellite'>
          <LayerGroup>
            <TileLayer
              attribution="Tiles &copy; Esri"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
            <TileLayer
              url="https://services.arcgisonline.com/arcgis/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
            />
          </LayerGroup>
        </LayersControl.BaseLayer>
      </LayersControl>

      <CrossHair />
      {/* <SelectService /> */}
      <UserPosition />
      {
       servicesDetails && servicesDetails?.length > 0 &&
        <ServiceMarker />
      }
      <RoutingPath />
    </MapContainer>
  );
};

export default MapClient;
