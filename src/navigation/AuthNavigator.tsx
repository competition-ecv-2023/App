import {createNativeStackNavigator, NativeStackScreenProps} from "@react-navigation/native-stack";
import {Routes} from "./Route";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import CodeVerificationScreen from "../screens/CodeVerificationScreen";
import CustomHeader from "../components/CustomHeader";
import TutorialScreen from "../screens/TutorialScreen";
import {useEffect, useState} from "react";
import {getValueFor} from "../utils/SecureStore";

const Stack = createNativeStackNavigator();
const AuthNavigator = ({navigation}: NativeStackScreenProps<any>) => {
    useEffect(() => {
        (async () => {
            const tutorialStatus = await getValueFor("tutorialDone");
            if (tutorialStatus !== "true") {
                navigation.navigate(Routes.TUTORIAL_SCREEN);
            }
        })();
    }, [])

    return (
        <Stack.Navigator
            initialRouteName={Routes.LOGIN_SCREEN}
            screenOptions={{
                headerShown: false,
                header: (props) => <CustomHeader {...props} backgroundColor={"#1B404E"} textColor={"white"}/>
            }}
        >
            <Stack.Screen name={Routes.LOGIN_SCREEN} component={LoginScreen} />
            <Stack.Screen name={Routes.REGISTER_SCREEN} component={RegisterScreen} options={{headerShown: true}}/>
            <Stack.Screen name={Routes.CODEVERIFICATION_SCREEN} component={CodeVerificationScreen} options={{headerShown: true}} />
            <Stack.Screen name={Routes.TUTORIAL_SCREEN} component={TutorialScreen} />
        </Stack.Navigator>
    );
}

export default AuthNavigator;
