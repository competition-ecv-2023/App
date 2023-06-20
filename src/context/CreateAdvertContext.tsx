import {createContext} from "react";
import {LatLng} from "react-native-maps";

export interface AdvertPropsType {
    userId: number;
    animalType: string;
    animalName: string;
    city: string;
    images: string[];
    identificationNumber: string;
    description: string;
    longitude: number;
    latitude: number;
    isPremium: boolean;
    isGoogleAds: boolean;
    advert_images?: string[];
}

export default createContext({
    advert: {} as AdvertPropsType,
    updateAdvertField: (field: string, value: any) => {
    },
    updateAdvertLocation: (markerCoords: LatLng) => {
    },
    createAdvert: () => {
    }
})
