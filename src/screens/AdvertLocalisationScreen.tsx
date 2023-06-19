import ScreenContainer from "../components/ScreenContainer";
import {StatusBar, StyleSheet} from "react-native";
import {Layout} from "@ui-kitten/components";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import MapView, {Circle, LatLng, Marker} from "react-native-maps";
import {useUserLocation} from "../context/UserLocation";
import {useContext, useEffect, useState} from "react";
import OutlineButton from "../components/OutlineButton";
import {Routes} from "../navigation/Route";
import CreateAdvertContext from "../context/CreateAdvertContext";

const AdvertLocalisationScreen = ({navigation}: NativeStackScreenProps<any>) => {

    const {updateAdvertLocation, createAdvert} = useContext(CreateAdvertContext);
    const {location, errorMsg} = useUserLocation();

    const [markerCoords, setMarkerCoords] = useState<LatLng>({latitude: 0, longitude: 0});

    useEffect(() => {
        setMarkerCoords({latitude: location?.coords.latitude || 0, longitude: location?.coords.longitude || 0});
    }, [location]);

    const handleAdvertCreation = () => {
        createAdvert();
        navigation.navigate(Routes.ADVERT_CONFIRMATION);
    }

    return (
        <ScreenContainer withScroll backgroundColor={'#fff'}>
            <Layout style={styles.container}>
                <MapView
                    style={{width: "100%", height: 450}}
                    initialCamera={{
                        zoom: 15,
                        center: {
                            latitude: location?.coords.latitude || 0,
                            longitude: location?.coords.longitude || 0,
                        },
                        heading: 0,
                        pitch: 0
                    }}
                    showsUserLocation

                >
                    <Marker
                        coordinate={{latitude: location?.coords.latitude || 0, longitude: location?.coords.longitude || 0}}
                        draggable
                        onDrag={(e) => setMarkerCoords(e.nativeEvent.coordinate)}
                        onDragEnd={(e) => updateAdvertLocation(e.nativeEvent.coordinate)}
                        image={require('../../assets/dog_marker.png')}
                    />
                    <Circle center={markerCoords} radius={500} fillColor={'rgba(0,255,0,0.2)'} strokeWidth={0}/>
                </MapView>

                <OutlineButton title={"Ajouter votre annonce"} onPress={handleAdvertCreation}/>
            </Layout>
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#fff',
        padding: 10
    },
    input: {
        backgroundColor: '#f1f1f1',
        marginVertical: 10,
    },
    inputText: {
        color: 'black'
    }
})

export default AdvertLocalisationScreen;
