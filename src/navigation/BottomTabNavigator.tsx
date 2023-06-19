import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Routes} from "./Route";
import MapScreen from "../screens/MapScreen";
import CustomTabBar from "../components/CustomTabBar";
import HomeScreen from "../screens/HomeScreen";
import CustomHeader from "../components/CustomHeader";
import AdvertCreation from "../screens/AdvertCreation";
import AdvertCreationNavigator from "./AdvertCreationNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator tabBar={props => <CustomTabBar {...props} />} screenOptions={{
            headerShown: false,
            header: (props) => <CustomHeader {...props} backgroundColor={"white"} textColor={"#1B404E"}/>
        }}>
            <Tab.Screen name={Routes.HOME_SCREEN} component={HomeScreen}/>
            <Tab.Screen name={Routes.MAP_SCREEN} component={MapScreen} options={{headerShown: false}}/>
            <Tab.Screen name={Routes.PROFILE_SCREEN} component={TempComponent}/>
            <Tab.Screen name={Routes.ADVERT_NAVIGATOR} component={AdvertCreationNavigator}/>

        </Tab.Navigator>
    )
}

const TempComponent = () => {
    return (
        <></>
    )
}

export default BottomTabNavigator;
