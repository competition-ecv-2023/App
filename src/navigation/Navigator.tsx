import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Layout, Text} from "@ui-kitten/components";
import {useAuthentication} from "../context/Authentication";
import AuthNavigator from "./AuthNavigator";
import BottomTabNavigator from "./BottomTabNavigator";
import {useEffect, useState} from "react";
import {getValueFor} from "../utils/SecureStore";
import TutorialScreen from "../screens/TutorialScreen";

const Stack = createNativeStackNavigator();
const Navigator = () => {
    const {user} = useAuthentication();
    const [tutorialDone, setTutorialDone] = useState(true);

    useEffect(() => {
        (async () => {
            const tutorialStatus = await getValueFor("tutorialDone");
            setTutorialDone(tutorialStatus === "true");
        })();
    }, [])

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {
                tutorialDone ? (
                    !user ? (
                        <Stack.Screen name={"BOTTOM_STACK"} component={BottomTabNavigator}/>
                    ) : (
                        <Stack.Screen name={"AUTH_STACK"} component={AuthNavigator}/>
                    )
                ) : (
                    <Stack.Screen name={"TUTORIAL_SCREEN"} component={TutorialScreen} />
                )
            }
        </Stack.Navigator>
    );
}

export default Navigator;
