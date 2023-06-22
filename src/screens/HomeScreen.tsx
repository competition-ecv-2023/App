import ScreenContainer from "../components/ScreenContainer";
import {Text} from "@ui-kitten/components";
import {useRefreshOnFocus} from "../hooks/UseRefreshOnFocus";
import ModalActions from "../components/ModalActions";
import {useQuery} from "@tanstack/react-query";
import {useApi} from "../hooks/UseApi";
import {FlatList, RefreshControl} from "react-native";
import Advert from "../components/Advert";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {isBackgroundLocationAvailableAsync} from "expo-location";
import {Routes} from "../navigation/Route";

const HomeScreen = ({navigation}: BottomTabScreenProps<any>) => {
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
                            navigation.navigate(Routes.ADVERT_NAVIGATOR)
                        }
                    },
                    {
                        title: "Sauver un animal ?",
                        buttonTitle: "Voir les annonces",
                        onPress: () => {
                            navigation.navigate(Routes.HOME_SCREEN)
                        }
                    },
                ]}
            />
            <Text>Accueil</Text>
            <FlatList
                data={query.data}
                renderItem={({item, index}) => <Advert item={item} index={index} navigation={navigation}/>}
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
