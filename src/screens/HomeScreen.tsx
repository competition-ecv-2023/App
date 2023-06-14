import ScreenContainer from "../components/ScreenContainer";
import {Text} from "@ui-kitten/components";
import {useRefreshOnFocus} from "../hooks/UseRefreshOnFocus";

const HomeScreen = () => {

    useRefreshOnFocus(() => Promise.resolve(1))

    return (
        <ScreenContainer>
            <Text>Accueil</Text>
        </ScreenContainer>
    )
}
export default HomeScreen;
