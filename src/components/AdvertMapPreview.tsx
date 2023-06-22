import {StyleSheet, Text, View} from "react-native";
import {Image} from "expo-image";
import {API_ADDRESS} from "../hooks/UseApi";
import OutlineButton from "./OutlineButton";
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {Routes} from "../navigation/Route";
import dayjs from "dayjs";

const AdvertMapPreview = ({ advert }: { advert: any }) => {

    const navigation: NavigationProp<any> = useNavigation()

    return (
        <View style={styles.card}>
            <Image source={API_ADDRESS + JSON.parse(advert["advert_images"])[0]} style={styles.img} contentFit={"cover"}/>
            <View style={{width: "50%"}}>
                <Text style={styles.title}>{advert["animal_name"]}</Text>
                <Text style={styles.description}>est proche de chez vous</Text>
                <Text style={[styles.description, {marginVertical: 10}]}>Perdu le <Text style={[styles.description, {fontFamily: "Work-Sans-700"}]}>{dayjs(advert["start_date"]).format("DD MMMM YYYY")}</Text></Text>
                <OutlineButton title={"Voir l'annonce"} smallText />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: 300,
        height: 200,
        borderRadius: 20,
        overflow: "hidden",
        flexDirection: "row",
        padding: 0,
        margin: 0,
        backgroundColor: "white"
    },
    img: {
        width: "50%",
        height: "100%",
        padding: 0,
        margin: 0
    },
    title: {
        fontSize: 16,
        fontFamily: "Sans-Poster-Bold",
        textAlign: "center",
        marginVertical: 5
    },
    description: {
        fontSize: 12,
        fontFamily: "Work-Sans-500",
        textAlign: "center"
    }
});

export default AdvertMapPreview;
