import { createContext } from "react";
import { LatLng } from "react-native-maps";

export interface AdvertPropsType {
  userId: number;
  animalType: string;
  animalName: string;
  animalAge: string;
  animalBreed: string;
  animalSex: string;
  city: string;
  images: string[];
  description: string;
  longitude: number;
  latitude: number;
  radius: number;
  isPremium: boolean;
  isGoogleAds: boolean;
}

export default createContext({
  advert: {} as AdvertPropsType,
  updateAdvertField: (field: string, value: any) => {},
  updateAdvertLocation: (markerCoords: LatLng, city: string) => {},
  createAdvert: () => {},
});
