import { create } from "zustand";


interface UserState {
  modeOfTransports: string[];
  setUserModeOfTransport: (modeOfTransport: string) => void;
  userModeOfTransport: string;
  userLocation: [number, number];
  setUserLocation: (location: [number, number]) => void;
  userDestination: [number , number ] | [null, null];
  setUserDestination: (location: [number, number] |[null,null]) => void;
}
const useUserStore = create<UserState>((set) => ({
  modeOfTransports: ['driving', 'cycling', 'foot'],
  userModeOfTransport:'driving',
  setUserModeOfTransport:(modeOfTransport:string)=>set({userModeOfTransport:modeOfTransport}),
  
  // Default : Kathmandu , Nepal [lat , lng]
  userLocation: [27.7172, 85.3240],
  setUserLocation:(location:[number,number])=>{
    set({userLocation:location})
  },


  userDestination: [null, null],
  setUserDestination:(location:[number,number] |[null,null])=>{
    set({userDestination:location})
  } ,


 

}));

export default useUserStore;