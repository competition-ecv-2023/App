import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useAuthentication} from "../context/Authentication";
import AuthNavigator from "./AuthNavigator";
import BottomTabNavigator from "./BottomTabNavigator";
import {Routes} from "./Route";

const Stack = createNativeStackNavigator();
const Navigator = () => {
    const {user} = useAuthentication();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {
                user ? (
                    <Stack.Screen name={Routes.BOTTOM_STACK} component={BottomTabNavigator}/>
                ) : (
                    <Stack.Screen name={Routes.AUTH_STACK} component={AuthNavigator}/>
                )
            }
        </Stack.Navigator>
    );
}

export default Navigator;
