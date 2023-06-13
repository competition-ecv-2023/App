import ScreenContainer from "../components/ScreenContainer";
import MapView from "react-native-maps";
import {StyleSheet} from 'react-native';
import {useEffect, useState} from "react";

import * as Location from 'expo-location';
import {LocationObject} from "expo-location";

const MapScreen = () => {

    // @ts-ignore
    const [location, setLocation] = useState<LocationObject|undefined>(undefined);
    const [errorMsg, setErrorMsg] = useState<String|undefined>(undefined);

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

    return (
        <ScreenContainer>
            <MapView
                style={styles.map}
                showsUserLocation={true}
                showsMyLocationButton={true}
            />
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
});
export default MapScreen;
