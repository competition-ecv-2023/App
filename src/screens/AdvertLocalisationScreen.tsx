import ScreenContainer from "../components/ScreenContainer";
import { StatusBar, StyleSheet } from "react-native";
import { Layout, Input } from "@ui-kitten/components";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import MapView, { Circle, LatLng, Marker } from "react-native-maps";
import { useUserLocation } from "../context/UserLocation";
import {useContext, useEffect, useRef, useState} from "react";
import OutlineButton from "../components/OutlineButton";
import { Routes } from "../navigation/Route";
import CreateAdvertContext from "../context/CreateAdvertContext";

const AdvertLocalisationScreen = ({
  navigation,
}: NativeStackScreenProps<any>) => {
  const { advert, updateAdvertField, updateAdvertLocation, createAdvert } =
    useContext(CreateAdvertContext);
  const { location, errorMsg } = useUserLocation();
  const mapRef = useRef(null);

  const [markerCoords, setMarkerCoords] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    setMarkerCoords({
      latitude: location?.coords.latitude || 0,
      longitude: location?.coords.longitude || 0,
    });
  }, [location]);

  return (
    <ScreenContainer withScroll backgroundColor={"#fff"}>
      <Layout style={styles.container}>
        <MapView
          ref={mapRef}
          style={{ width: "100%", height: 450 }}
          initialCamera={{
            zoom: 15,
            center: {
              latitude: location?.coords.latitude || 0,
              longitude: location?.coords.longitude || 0,
            },
            heading: 0,
            pitch: 0,
          }}
          showsUserLocation
          onMapLoaded={async () => {
            // @ts-ignore
            const address = await mapRef.current?.addressForCoordinate(location?.coords);
            updateAdvertLocation(location?.coords ?? {latitude: 0, longitude: 0}, address.locality);
          }}
        >
          <Marker
            coordinate={{
              latitude: location?.coords.latitude || 0,
              longitude: location?.coords.longitude || 0,
            }}
            draggable
            onDrag={(e) => setMarkerCoords(e.nativeEvent.coordinate)}
            onDragEnd={async (e) => {
              const coords = e.nativeEvent.coordinate;
              // @ts-ignore
              const address = await mapRef.current?.addressForCoordinate(e.nativeEvent.coordinate)
              updateAdvertLocation(coords, address.locality);
            }}
          />
          <Circle
            center={markerCoords}
            radius={500}
            fillColor={"rgba(0,255,0,0.2)"}
            strokeWidth={0}
          />
        </MapView>
        <Input
            label={"Ville de disparition"}
            placeholder={"Ville de disparition"}
            style={styles.input}
            textStyle={styles.inputText}
            value={advert.city}
            onChangeText={(value) => updateAdvertField("city", value)}
            size={"large"}
        />
        <OutlineButton title={"Ajouter votre annonce"} onPress={createAdvert} />
      </Layout>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#fff",
    padding: 10,
  },
  input: {
    backgroundColor: "#f1f1f1",
    marginVertical: 10,
  },
  inputText: {
    color: "black",
  },
});

export default AdvertLocalisationScreen;
