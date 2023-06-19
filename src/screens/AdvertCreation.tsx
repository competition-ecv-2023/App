import CreateAdvertContext, {AdvertPropsType} from "../context/CreateAdvertContext";
import AdvertDataScreen from "./AdvertDataScreen";
import {useState} from "react";

const AdvertCreation = () => {

    const [advert, setAdvert] = useState<AdvertPropsType>({
        animalName: "",
        animalType: "",
        disappearingAddress: "",
        identificationNumber: "",
        moreInfos: "",
        pictures: []
    });

    return (
        <CreateAdvertContext.Provider value={{advert, setAdvert}}>
            <AdvertDataScreen/>
        </CreateAdvertContext.Provider>
    )

}

export default AdvertCreation;
