import ScreenContainer from "../components/ScreenContainer";
import {Text} from "@ui-kitten/components";
import {useRefreshOnFocus} from "../hooks/UseRefreshOnFocus";
import ModalActions from "../components/ModalActions";

const HomeScreen = () => {

    useRefreshOnFocus(() => Promise.resolve(1))

    return (
        <ScreenContainer>
            <ModalActions
                actions={[
                    {
                        title: "Avez-vous perdu votre partenaire ?",
                        buttonTitle: "Créer votre annonce",
                        onPress: () => {
                        }
                    },
                    {
                        title: "Sauver un animal ?",
                        buttonTitle: "Voir les annonces",
                        onPress: () => {
                        }
                    },
                ]}
            />
            <Text>Accueil</Text>
        </ScreenContainer>
    )
}
export default HomeScreen;
