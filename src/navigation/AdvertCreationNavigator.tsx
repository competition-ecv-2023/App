import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AdvertDataScreen from "../screens/AdvertDataScreen";
import {Routes} from "./Route";
import {useState} from "react";
import CreateAdvertContext, {AdvertPropsType} from "../context/CreateAdvertContext";

const Stack = createNativeStackNavigator();

const AdvertCreationNavigator = () => {

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
            <Stack.Navigator>
                <Stack.Screen name={Routes.ADVERT_DATA_SCREEN} component={AdvertDataScreen}/>
            </Stack.Navigator>
        </CreateAdvertContext.Provider>
    )
}

export default AdvertCreationNavigator;
