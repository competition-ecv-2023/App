import ScreenContainer from "../components/ScreenContainer";
import MapView, {Callout, Circle, Marker} from "react-native-maps";
import {Dimensions, StatusBar, StyleSheet} from 'react-native';
import {Text} from "@ui-kitten/components";
import {useUserLocation} from "../context/UserLocation";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import {AdvertPropsType} from "../context/CreateAdvertContext";
import AdvertMapPreview from "../components/AdvertMapPreview";
import {Routes} from "../navigation/Route";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";

const MapScreen = ({navigation}: BottomTabScreenProps<any>) => {
    const {location, errorMsg} = useUserLocation();
    const query = useQuery({queryKey: ['adverts']});

    const [advertMarkerSelected, setAdvertMarkerSelected] = useState<AdvertPropsType | undefined>(undefined);

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
                onPress={() => setAdvertMarkerSelected(undefined)}
            >
                {
                    // @ts-ignore
                    query.data?.map((advert: any) => (
                        <Marker
                            key={advert.id}
                            coordinate={{
                                latitude: advert.latitude,
                                longitude: advert.longitude
                            }}
                            onPress={() => {
                                console.log("selected advert", advert)
                                setAdvertMarkerSelected(advert)
                            }}
                        >
                            <Callout
                                tooltip
                                onPress={() => navigation.navigate(Routes.ADVERT_SCREEN,{animal: advert})}
                            >
                                <AdvertMapPreview advert={advert} />
                            </Callout>
                        </Marker>
                    ))
                }
                {
                    advertMarkerSelected && (
                        <Circle
                            center={{
                                latitude: advertMarkerSelected.latitude,
                                longitude: advertMarkerSelected.longitude
                            }}
                            radius={500}
                            fillColor={"rgba(0,255,0,0.2)"}
                            strokeWidth={0}
                        />
                    )
                }
            </MapView>
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: Dimensions.get('window').height - 50,
        marginTop: StatusBar.currentHeight,
    },
});
export default MapScreen;
