import {Button, Layout, Text, ViewPager} from "@ui-kitten/components";
import {useState} from "react";
import {StatusBar, StyleSheet} from "react-native";
import {save} from "../utils/SecureStore";

const TutorialScreen = () => {

    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <ViewPager
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}
            style={{flex: 1}}
        >
            <Layout style={styles.tab}>
                <Text>Page 1</Text>
                <Button onPress={() => setSelectedIndex(current => current+1)}>Page suivante</Button>
            </Layout>
            <Layout style={styles.tab}>
                <Text>Page 2</Text>
                <Button onPress={() => setSelectedIndex(current => current-1)}>Page précédente</Button>
                <Button onPress={() => setSelectedIndex(current => current+1)}>Page suivante</Button>
            </Layout>
            <Layout style={styles.tab}>
                <Text>Page 3</Text>
                <Button onPress={() => setSelectedIndex(current => current-1)}>Page précédente</Button>
                <Button onPress={() => save("tutorialDone", "true")}>J'ai compris le fonctionnement</Button>
            </Layout>
        </ViewPager>
    )
}

const styles = StyleSheet.create({
    tab: {
        height: '100%',
        paddingTop: StatusBar.currentHeight
    }
});

export default TutorialScreen;
