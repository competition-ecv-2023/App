import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Routes} from "./Route";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import CodeVerificationScreen from "../screens/CodeVerificationScreen";
import CustomHeader from "../components/CustomHeader";

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
            <Stack.Screen name={Routes.REGISTER_SCREEN} component={RegisterScreen} options={{headerShown: true, header: CustomHeader}}/>
            <Stack.Screen name={Routes.CODEVERIFICATION_SCREEN} component={CodeVerificationScreen} options={{headerShown: true, header: CustomHeader}} />
        </Stack.Navigator>
    );
}

export default AuthNavigator;
