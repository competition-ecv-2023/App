import {createContext} from "react";

export interface AdvertPropsType {
    animalType: string;
    animalName: string;
    disappearingAddress: string;
    pictures: string[];
    identificationNumber: string;
    moreInfos: string;
}

export default createContext({
    advert: {} as AdvertPropsType,
    setAdvert: (advert: AdvertPropsType) => {
    }
})
