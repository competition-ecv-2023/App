import ScreenContainer from "../components/ScreenContainer";
import {Text} from "@ui-kitten/components";
import {useRefreshOnFocus} from "../hooks/UseRefreshOnFocus";
import ModalActions from "../components/ModalActions";
import {useQuery} from "@tanstack/react-query";
import {useApi} from "../hooks/UseApi";

const HomeScreen = () => {
    const api = useApi();

    // Refresh data when screen is focused after first render
    useRefreshOnFocus(() => Promise.resolve(1))

    // Get adverts
    const getAdverts = async () => {
        return await api.get("adverts")
            .then((res) => {
                console.log("RESPONSE", res.data)
                return res.data
            })
            .catch((e) => console.log(e.response))
    }

    // Queries
    const query = useQuery({ queryKey: ['adverts'], queryFn: getAdverts })




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
