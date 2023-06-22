import ScreenContainer from "../components/ScreenContainer";
import {Layout, Text} from "@ui-kitten/components";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import React, {useEffect, useState} from "react";
import {FlatList, Modal, StatusBar, StyleSheet, TouchableOpacity, View} from "react-native";
import {BackIcon} from "../components/CustomHeader";
import {Image} from "expo-image";
import {API_ADDRESS, useApi} from "../hooks/UseApi";
import dayjs from "dayjs";
import OutlineButton from "../components/OutlineButton";
import MapView, {Circle, Marker} from "react-native-maps";
import {useUserLocation} from "../context/UserLocation";
import ImageViewer from "react-native-image-zoom-viewer";
import {Routes} from "../navigation/Route";
import {showMessage} from "react-native-flash-message";
import {AxiosError} from "axios";

const AdvertScreen = ({navigation, route}: BottomTabScreenProps<any>) => {

    const {location} = useUserLocation();
    const api = useApi();
    const [animal, setAnimal] = useState<any | undefined>(undefined);

    const [showModalImages, setShowModalImages] = useState<number>(-1);

    useEffect(() => {
        if (route.params) {
            if (route.params.animal) {
                setAnimal(route.params.animal)
            }
        }
    }, [route])

    const deleteAdvert = () => {
        api.delete("adverts/" + animal["id"])
            .then(() => {
                showMessage({
                    type: "success",
                    message: "Le propriétaire va être contacté pour lui rendre son animal"
                })
                navigation.navigate(Routes.HOME_SCREEN);
            }).catch((e: AxiosError) => {
            showMessage({
                type: "danger",
                message: "Une erreur est survenue"
            })
            console.log(e.response)
        })
    }

    if (!animal) {
        return <></>
    }

    return (
        <ScreenContainer withScroll backgroundColor={"#fce9d5"}>
            <Layout style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}
                                      style={{position: 'absolute', left: 5, padding: 10}}>
                        <BackIcon/>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{animal["animal_name"]}</Text>
                </View>
                <FlatList
                    data={JSON.parse(animal["advert_images"])}
                    renderItem={({item, index}) =>
                        <Image
                            key={index}
                            source={{uri: API_ADDRESS + item}}
                            style={{width: 200, height: 200}}
                            contentPosition={"center"}
                            onTouchEnd={() => setShowModalImages(index)}
                        />
                    }
                    nestedScrollEnabled={true}
                    horizontal
                />
                <Modal visible={showModalImages !== -1} transparent>
                    <ImageViewer
                        index={showModalImages}
                        imageUrls={JSON.parse(animal["advert_images"]).map((img: string) => ({url: API_ADDRESS + img}))}
                        enableSwipeDown
                        onSwipeDown={() => setShowModalImages(-1)}
                    />
                </Modal>
                <View style={styles.centerContainer}>
                    <View>
                        <Text style={styles.textRegular}>Sexe : <Text
                            style={{...styles.textRegular, ...styles.textBold}}>{animal["animal_sex"]}</Text></Text>
                        <Text style={styles.textRegular}>Age : <Text
                            style={{...styles.textRegular, ...styles.textBold}}>{animal["animal_age"]} mois</Text></Text>
                    </View>
                    <View>
                        <Text style={styles.textRegular}>Race : <Text
                            style={{...styles.textRegular, ...styles.textBold}}>{animal["animal_breed"].length > 0 ? animal["animal_breed"] : "Non renseignée"}</Text></Text>
                        <Text style={styles.textRegular}>Perdu <Text
                            style={{...styles.textRegular, ...styles.textBold}}>le {dayjs(animal["start_date"]).format("DD MMMM YYYY")}</Text></Text>
                    </View>
                </View>
                <Text style={[styles.textRegular, styles.textBold, styles.info]}>{animal["description"]}</Text>

                <OutlineButton title={"Je l'ai retrouvé(e) !"} onPress={deleteAdvert}/>
                <MapView
                    style={{width: "100%", height: 450}}
                    initialCamera={{
                        zoom: 15,
                        center: {
                            latitude: animal["latitude"],
                            longitude: animal["longitude"],
                        },
                        heading: 0,
                        pitch: 0,
                    }}
                    showsUserLocation
                >
                    <Marker
                        coordinate={{
                            latitude: animal["latitude"],
                            longitude: animal["longitude"],
                        }}
                        style={{width: 25, height: 25, borderRadius: 50, backgroundColor: "red", overflow: "hidden"}}
                    />
                    <Circle
                        center={{latitude: animal["latitude"], longitude: animal["longitude"]}}
                        radius={500}
                        fillColor={"rgba(0,255,0,0.2)"}
                        strokeWidth={0}
                    />
                </MapView>
            </Layout>
        </ScreenContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "transparent"
    },
    headerContainer: {
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    headerTitle: {
        fontFamily: "Sans-Poster-Bold",
        fontSize: 24,
        color: "#000"
    },
    centerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginVertical: 20
    },
    textRegular: {
        color: "black",
        fontSize: 16,
        fontFamily: "Work-Sans-400",
        marginVertical: 10
    },
    textBold: {
        fontFamily: "Work-Sans-700"
    },
    info: {
        textAlign: "center",
        width: "100%",
    }
})

export default AdvertScreen;
