import {Icon, IconElement, Text, TopNavigation, TopNavigationAction} from "@ui-kitten/components";
import ScreenContainer from "../components/ScreenContainer";
import {ScreenProps} from "../interfaces/ScreenProps";

const BackIcon = (props: any): IconElement => (
    <Icon
        {...props}
        name='arrow-back'
        pack={'ionicons'}
    />
);
const RegisterScreen = ({navigation}: ScreenProps) => {

    return (
        <ScreenContainer>
            <TopNavigation title={"Inscription"} accessoryLeft={() => <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()}/>}/>
            <Text>Inscription</Text>
        </ScreenContainer>
    )
}

export default RegisterScreen;
