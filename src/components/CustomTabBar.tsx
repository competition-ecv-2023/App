import {BottomTabBarProps} from "@react-navigation/bottom-tabs";
import {BottomNavigation, BottomNavigationTab, Icon} from "@ui-kitten/components";
import {Routes} from "../navigation/Route";
import {StyleSheet} from "react-native";

const CustomTabBar = ({state, navigation}: BottomTabBarProps) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}
        style={styles.container}
        appearance={"noIndicator"}
    >
        {state.routes.map((route, index) => (
            <BottomNavigationTab
                key={index}
                icon={(props) => <Icon {...props} name={getTabIcon(route.name)}
                                       style={{...styles.tabIcon, ...(state.index === index ? styles.tabIconSelected : {})}}/>}
                style={{...styles.tab, ...(state.index === index ? styles.selectedTab : {})}}
            />
        ))}
    </BottomNavigation>
)

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingHorizontal: 10
    },
    tab: {
        borderRadius: 10,
    },
    selectedTab: {
        backgroundColor: "#EEA339",
    },
    tabIcon: {
        height: 24,
        color: "#EEA339"
    },
    tabIconSelected: {
        color: "#fff"
    }
})
const getTabIcon = (routeName: string) => {
    switch (routeName) {
        case Routes.HOME_SCREEN:
            return "home";
        case Routes.MAP_SCREEN:
            return "map";
        case Routes.PROFILE_SCREEN:
            return "user";
        case Routes.ADVERT_NAVIGATOR:
            return "calendar";
        default:
            return "minus";
    }
}

export default CustomTabBar;
