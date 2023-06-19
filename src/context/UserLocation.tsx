import React, {useEffect, useState} from "react";
import {LocationObject} from "expo-location";
import * as Location from "expo-location";
import {err} from "react-native-svg/lib/typescript/xml";

interface UserLocationProviderProps {
    children: React.ReactNode;
}

const UserLocationContext = React.createContext({
   location: undefined as LocationObject | undefined,
    errorMsg: undefined as String | undefined,
});

export const UserLocationProvider = ({ children }: UserLocationProviderProps): JSX.Element => {
    const [location, setLocation] = useState<LocationObject | undefined>(undefined);
    const [errorMsg, setErrorMsg] = useState<String | undefined>(undefined);

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    useEffect(() => {
        console.log(errorMsg, location);
    }, [errorMsg, location])

    return (
        <UserLocationContext.Provider value={{location, errorMsg}}>
            {children}
        </UserLocationContext.Provider>
    )
}

export const useUserLocation = () => React.useContext(UserLocationContext);
