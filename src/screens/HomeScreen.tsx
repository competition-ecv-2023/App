import ScreenContainer from "../components/ScreenContainer";
import {Text} from "@ui-kitten/components";
import {useRefreshOnFocus} from "../hooks/UseRefreshOnFocus";
import ModalActions from "../components/ModalActions";
import {useQuery} from "@tanstack/react-query";
import {useApi} from "../hooks/UseApi";
import {FlatList, RefreshControl} from "react-native";
import Advert from "../components/Advert";

const HomeScreen = () => {
    const api = useApi();

    // Get adverts
    const getAdverts = async () => {
        return await api.get("adverts")
            .then((res) => res.data)
            .catch((e) => console.log(e.response))
    }

    // Queries
    const query = useQuery({queryKey: ['adverts'], queryFn: getAdverts})

    // Refresh data when screen is focused after first render
    useRefreshOnFocus(query.refetch)


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
            <FlatList
                data={query.data}
                renderItem={Advert}
                refreshControl={
                    <RefreshControl
                        refreshing={query.isFetching}
                        onRefresh={query.refetch}
                    />
                }
            />
        </ScreenContainer>
    )
}
export default HomeScreen;
