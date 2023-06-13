import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Layout, Text} from "@ui-kitten/components";
import {Routes} from "./Route";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createNativeStackNavigator();
const AuthNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={Routes.LOGIN_SCREEN}
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name={Routes.LOGIN_SCREEN} component={LoginScreen} />
            <Stack.Screen name={Routes.REGISTER_SCREEN} component={RegisterScreen} />
        </Stack.Navigator>
    );
}

export default AuthNavigator;
