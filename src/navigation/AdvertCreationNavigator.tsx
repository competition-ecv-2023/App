import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AdvertDataScreen from "../screens/AdvertDataScreen";
import {Routes} from "./Route";
import {useEffect, useState} from "react";
import CreateAdvertContext, {AdvertPropsType} from "../context/CreateAdvertContext";
import CustomHeader from "../components/CustomHeader";

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

    const updateAdvertField = (field: string, value: any) => {
        setAdvert({...advert, [field]: value});
    }

    return (
        <CreateAdvertContext.Provider value={{advert, updateAdvertField}}>
            <Stack.Navigator screenOptions={{
                headerShown: false,
                header: (props) => <CustomHeader {...props} backgroundColor={"white"} textColor={"#1B404E"}/>
            }}>
                <Stack.Screen name={Routes.ADVERT_DATA_SCREEN} component={AdvertDataScreen} options={{headerShown: true}}/>
            </Stack.Navigator>
        </CreateAdvertContext.Provider>
    )
}

export default AdvertCreationNavigator;
