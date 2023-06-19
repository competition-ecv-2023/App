import {Text, Layout} from "@ui-kitten/components";
import ScreenContainer from "../components/ScreenContainer";
import {StyleSheet} from "react-native";
import OutlineButton from "../components/OutlineButton";

const AdvertConfirmation = () => {

    return (

            <ScreenContainer withScroll backgroundColor={'#fff'}>
                <Layout style={{padding: 20, backgroundColor: "#fff"}}>
                    <Text style={styles.title}>Votre annonce est publiée !</Text>
                    <Text style={styles.text}>L'annonce de a été publiée sur Pat'Perdue ainsi que sur le groupe Facebook de votre région.</Text>
                    <OutlineButton title="Accéder à l'annonce"/>
                    <Text style={styles.title}>Contactez la communauté</Text>
                    <Text style={styles.text}>Les utilisateurs se trouvant dans la zone de recherche vont être alerter de la fugue de !</Text>
                    <Text style={styles.text}>Ils pourront déclarer l'animal comme retrouvé et vous contacter en cas d'informations.</Text>
                    <OutlineButton title="Voir la carte"/>
                </Layout>
            </ScreenContainer>
    )

}

const styles = StyleSheet.create({
    title: {
        marginTop: 10,
        fontWeight: "bold",
        color: "black",
        fontSize: 25,
        textAlign: "center",
    },
    text: {
        color: "black",
        fontSize: 18,
        marginTop: 5,
        marginBottom: 5,
    }
})

export default AdvertConfirmation;
