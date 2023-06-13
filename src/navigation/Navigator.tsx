import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Layout, Text} from "@ui-kitten/components";
import {useAuthentication} from "../context/Authentication";
import AuthNavigator from "./AuthNavigator";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createNativeStackNavigator();
const Navigator = () => {
    const {user} = useAuthentication();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {
                !user ? (
                    <Stack.Screen name={"BOTTOM_STACK"} component={BottomTabNavigator} />
                ) : (
                    <Stack.Screen name={"AUTH_STACK"} component={AuthNavigator}/>
                )}
        </Stack.Navigator>
    );
}

export default Navigator;
