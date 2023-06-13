import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Routes} from "./Route";
import MapScreen from "../screens/MapScreen";
import CustomTabBar from "../components/CustomTabBar";
import HomeScreen from "../screens/HomeScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator tabBar={props => <CustomTabBar { ...props } />} screenOptions={{headerShown: false}}>
            <Tab.Screen name={Routes.HOME_SCREEN} component={HomeScreen} />
            <Tab.Screen name={Routes.MAP_SCREEN} component={MapScreen} />
        </Tab.Navigator>
    )
}

export default BottomTabNavigator;
