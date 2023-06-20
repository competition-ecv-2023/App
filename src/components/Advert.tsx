import {StyleSheet, TouchableOpacity, View} from "react-native";
import {Image} from "expo-image";
import {API_ADDRESS} from "../hooks/UseApi";
import {Text} from "@ui-kitten/components";

const Advert = ({item, index}: {item: any, index: number}) => {
    const calcTime = () => {
        const time = (Date.now() - Date.parse(item["start_date"]))/3600000;
        const hours = Math.floor(time);
        const minutes = Math.floor((time - hours) * 60);
        return `${hours}h ${minutes}min`;
    }

    return (
        <TouchableOpacity style={styles.container}>
            <Image
                source={{uri: API_ADDRESS + JSON.parse(item["advert_images"])[0]}}
                style={styles.image}
                contentPosition={"top center"}
                contentFit={"cover"}
            />
            <View style={styles.textContainer}>
                <Text style={styles.text}>{item["animal_name"]}</Text>
                <Text style={styles.text2}>Disparu depuis {calcTime()}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: "100%",
        height: 300,
        padding: 20,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 10
    },
    text: {
        color: "#F19B3F",
        fontFamily: "Sans-Poster-Bold",
        fontSize: 24
    },
    text2: {
        color: "#FFF",
        fontFamily: "Work-Sans-800",
        fontSize: 16
    },
    textContainer: {
        position: "absolute",
        width: "100%",
        bottom: 20,
        left: 20,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "rgba(27,64,78,0.2)",
    }
})

export default Advert
