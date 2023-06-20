import ScreenContainer from "../components/ScreenContainer";
import MapView from "react-native-maps";
import {StatusBar, StyleSheet, View} from 'react-native';
import {Text} from "@ui-kitten/components";
import {useUserLocation} from "../context/UserLocation";

const MapScreen = () => {
    const {location, errorMsg} = useUserLocation();

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
                loadingEnabled
                loadingIndicatorColor={"red"}
            />
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
        marginTop: StatusBar.currentHeight
    },
});
export default MapScreen;
