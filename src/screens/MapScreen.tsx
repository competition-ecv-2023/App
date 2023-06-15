import ScreenContainer from "../components/ScreenContainer";
import MapView, {Circle, LatLng, Marker} from "react-native-maps";
import {StyleSheet} from 'react-native';
import {useEffect, useState} from "react";

import * as Location from 'expo-location';
import {LocationObject} from "expo-location";
import {Text} from "@ui-kitten/components";

const MapScreen = () => {

    // @ts-ignore
    const [location, setLocation] = useState<LocationObject | undefined>(undefined);
    const [errorMsg, setErrorMsg] = useState<String | undefined>(undefined);

    const [markerCoords, setMarkerCoords] = useState<LatLng>({latitude: 0, longitude: 0});

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
        setMarkerCoords({latitude: location?.coords.latitude || 0, longitude: location?.coords.longitude || 0});
    }, [location]);

    if (errorMsg) {
        // @ts-ignore
        return <Text>{errorMsg}</Text>
    }

    if (!location) {
        return <Text>Loading ...</Text>
    }

    return (
        <ScreenContainer>
            <MapView
                style={styles.map}
                showsUserLocation={true}
                showsMyLocationButton={true}
                initialCamera={{
                    zoom: 11,
                    center: {
                        latitude: location?.coords.latitude || 0,
                        longitude: location?.coords.longitude || 0,
                    },
                    heading: 0,
                    pitch: 0
                }}
            >
                <Marker
                    coordinate={{latitude: location?.coords.latitude || 0, longitude: location?.coords.longitude || 0}}
                    draggable
                    onDrag={(e) => setMarkerCoords(e.nativeEvent.coordinate)}
                />
                <Circle center={markerCoords} radius={10000} strokeColor={'red'} strokeWidth={2}/>
            </MapView>
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
