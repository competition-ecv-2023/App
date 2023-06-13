import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Layout, Text} from "@ui-kitten/components";
import {useAuthentication} from "../context/Authentication";
import AuthNavigator from "./AuthNavigator";

const Stack = createNativeStackNavigator();
const Navigator = () => {
    const {user} = useAuthentication();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {
                user ? (
                    <Stack.Group>
                        <Stack.Screen name={"Test"}>
                            {() => <Layout level={"1"}><Text status={"success"}>OUI</Text></Layout>}
                        </Stack.Screen>
                    </Stack.Group>
                ) : (
                    <Stack.Screen name={"AUTH_STACK"} component={AuthNavigator}/>
                )}
        </Stack.Navigator>
    );
}

export default Navigator;
