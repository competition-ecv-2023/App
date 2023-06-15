import {Layout, Text} from "@ui-kitten/components";
import {StatusBar, StyleSheet} from "react-native";
import {Image} from "expo-image";

interface TutorialTabProps {
    image?: string;
    title?: string;
    description?: string;
}

const TutorialTab = ({image, title, description}: TutorialTabProps) => {

    return (
        <Layout style={styles.tab}>
            <Image source={image} style={{width: 300, height: 250, alignSelf: "center"}} placeholder={require('../../assets/adaptive-icon.png')}/>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </Layout>
    )
}

const styles = StyleSheet.create({
    tab: {
        height: '100%',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: "space-evenly"
    },
    title: {
        fontFamily: "Work-Sans-900",
        fontSize: 25,
        textAlign: "center",
        marginBottom: 10,
        marginTop: 20
    },
    description: {
        fontFamily: "Work-Sans-500",
        fontSize: 18,
        textAlign: "center",
        color: "rgba(27,64,78,0.4)",
        width: '70%'
    }
});

export default TutorialTab;
