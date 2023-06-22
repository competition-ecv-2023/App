import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Routes} from "./Route";
import MapScreen from "../screens/MapScreen";
import CustomTabBar from "../components/CustomTabBar";
import HomeScreen from "../screens/HomeScreen";
import CustomHeader from "../components/CustomHeader";
import AdvertCreationNavigator from "./AdvertCreationNavigator";
import {UserLocationProvider} from "../context/UserLocation";
import AdvertScreen from "../screens/AdvertScreen";
import ScreenContainer from "../components/ScreenContainer";
import OutlineButton from "../components/OutlineButton";
import {Layout} from "@ui-kitten/components";
import {useAuthentication} from "../context/Authentication";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <UserLocationProvider>
            <Tab.Navigator tabBar={props => <CustomTabBar {...props} />} screenOptions={{
                headerShown: false,
                header: (props) => <CustomHeader {...props} backgroundColor={"white"} textColor={"#1B404E"}/>
            }}>
                <Tab.Screen name={Routes.HOME_SCREEN} component={HomeScreen} options={{headerShown: true}}/>
                <Tab.Screen name={Routes.MAP_SCREEN} component={MapScreen}/>
                <Tab.Screen name={Routes.PROFILE_SCREEN} component={TempComponent}/>
                <Tab.Screen name={Routes.ADVERT_NAVIGATOR} component={AdvertCreationNavigator}/>
                <Tab.Screen name={Routes.ADVERT_SCREEN} component={AdvertScreen}/>
            </Tab.Navigator>
        </UserLocationProvider>
    )
}

const TempComponent = () => {
    const {logout} = useAuthentication()
    return (
        <ScreenContainer>
            <Layout style={{height: "100%", alignItems: "center", justifyContent: "center", backgroundColor: "white", }}>
                <OutlineButton title={"Se déconnecter"} onPress={logout}/>
            </Layout>
        </ScreenContainer>
    )
}

export default BottomTabNavigator;
