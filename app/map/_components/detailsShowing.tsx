import React, { useState } from 'react';
import { Phone, Globe, Clock, MapPin, AlertCircle, Navigation, ChevronDown, Star } from 'lucide-react';
import { Place } from '../map-client';
import useUserStore from '@/store/userStore';

const EmergencyServiceCard = ({ 
  service, 
  isSelected, 
  onSelect 
}: {
  service: Place;
  isSelected: boolean;
  onSelect: (service: Place) => void;
}) => {

  const setUserDestination =useUserStore(state=>state.setUserDestination)

  const [isExpanded, setIsExpanded] = useState(false);
  const isEmergency = service.emergency === "yes";
  const hasPhone = service.phoneNumber !== "Not Provided.";

  const getDirections = () => {
    setUserDestination([parseFloat(service.lat) , parseFloat(service.lon) ])
    onSelect(service);
    window.scrollTo({
      top:0,
      behavior:'smooth'
    })
  };

  const callNumber = () => {
    if (hasPhone) {
      window.location.href = `tel:${service.phoneNumber}`;
    }
  };



  return (
    <div className={`rounded-xl overflow-hidden max-w-screen  transition-all duration-300 ${
      isSelected 
        ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-xl shadow-blue-500/30 scale-[1.02]' 
        : 'bg-white shadow-sm border border-gray-200 hover:shadow-md'
    }`}>
      {/* Collapsed View */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 cursor-pointer flex items-center gap-3"
      >
        <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
          isSelected 
            ? 'bg-white/20 ring-2 ring-white/50' 
            : isEmergency 
              ? 'bg-red-500' 
              : 'bg-blue-500'
        }`}>
          <AlertCircle className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-white'}`} />
          {isSelected && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
              <Star className="w-3 h-3 text-blue-600 fill-blue-600" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={`font-semibold truncate ${isSelected ? 'text-white' : 'text-gray-900'}`}>
              {service.name}
            </h3>
            {isSelected && (
              <span className="px-2 py-0.5 bg-yellow-400 text-blue-900 text-xs font-bold rounded-full">
                SELECTED
              </span>
            )}
            {isEmergency && !isSelected && (
              <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded">
                24/7
              </span>
            )}
            {hasPhone && !isSelected && (
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                ✓ Phone
              </span>
            )}
          </div>
          <p className={`text-sm capitalize ${isSelected ? 'text-white/90' : 'text-gray-500'}`}>
            {service.serviceCategory}
          </p>
        </div>

        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${
          isExpanded ? 'rotate-180' : ''
        } ${isSelected ? 'text-white' : 'text-gray-400'}`} />
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className={`border-t p-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300 ${
          isSelected 
            ? 'border-white/20 bg-white/10' 
            : 'border-gray-100 bg-gray-50'
        }`}>
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                callNumber();
              }}
              disabled={!hasPhone}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                !hasPhone
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : isSelected
                    ? 'bg-white text-green-600 hover:bg-white/90 active:scale-95'
                    : 'bg-green-500 text-white hover:bg-green-600 active:scale-95'
              }`}
            >
              <Phone className="w-4 h-4" />
              Call
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                getDirections();
              }}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all active:scale-95 ${
                isSelected
                  ? 'bg-yellow-400 text-blue-900 hover:bg-yellow-300'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              <Navigation className="w-4 h-4" />
              Directions
            </button>
          </div>

          {/* Details Grid */}
          <div className="space-y-2 pt-2">
            <div className="flex items-start gap-2 text-sm">
              <Clock className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                isSelected ? 'text-white/70' : 'text-gray-400'
              }`} />
              <div>
                <span className={isSelected ? 'text-white/80' : 'text-gray-500'}>Hours: </span>
                <span className={`font-medium ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                  {service.opening_hours}
                </span>
              </div>
            </div>

            {hasPhone && (
              <div className="flex items-start gap-2 text-sm">
                <Phone className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                  isSelected ? 'text-white/70' : 'text-gray-400'
                }`} />
                <div>
                  <span className={isSelected ? 'text-white/80' : 'text-gray-500'}>Phone: </span>
                  <span className={`font-medium ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                    {service.phoneNumber}
                  </span>
                </div>
              </div>
            )}

            {service.website !== "Not Provided." && (
              <div className="flex items-start gap-2 text-sm">
                <Globe className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                  isSelected ? 'text-white/70' : 'text-gray-400'
                }`} />
                <a target='_blank'  rel="noopener noreferrer" href={service.website?.startsWith('http://') || service.website?.startsWith('https://') ? service.website : `https://${service.website}`} className={`font-medium text-left break-all hover:underline ${
                    isSelected ? 'text-yellow-300' : 'text-blue-600'
                  }`}>
                    {service.website}</a>
              </div>
            )}

            <div className="flex items-start gap-2 text-sm">
              <MapPin className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                isSelected ? 'text-white/70' : 'text-gray-400'
              }`} />
              <div>
                <span className={isSelected ? 'text-white/80' : 'text-gray-500'}>Location: </span>
                <span className={`font-mono text-xs ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                  {service.lat}, {service.lon}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const App = ({ services }: { services: Place[] }) => {
  const [selectedService, setSelectedService] = useState<Place | null>(null);

  // Sort services: selected first, then by phone availability, then by emergency status
  const sortedServices = [...services].sort((a, b) => {
    // Selected service always first
    if (selectedService?.id === a.id) return -1;
    if (selectedService?.id === b.id) return 1;

    // Then prioritize services with phone numbers
    const aHasPhone = a.phoneNumber !== "Not Provided." ? 1 : 0;
    const bHasPhone = b.phoneNumber !== "Not Provided." ? 1 : 0;
    if (aHasPhone !== bHasPhone) return bHasPhone - aHasPhone;

    // Then prioritize emergency services
    const aIsEmergency = a.emergency === "yes" ? 1 : 0;
    const bIsEmergency = b.emergency === "yes" ? 1 : 0;
    return bIsEmergency - aIsEmergency;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Emergency Services</h1>
          <p className="text-gray-600 text-sm">
            {selectedService 
              ? `Navigating to ${selectedService.name}` 
              : 'Select a service to get directions'}
          </p>
        </div>

        <div className="space-y-3">
          {sortedServices.map(service => (
            <EmergencyServiceCard
              key={service.id}
              service={service}
              isSelected={selectedService?.id === service.id}
              onSelect={setSelectedService}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;