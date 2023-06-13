import {BottomTabBarProps} from "@react-navigation/bottom-tabs";
import {BottomNavigation, BottomNavigationTab, Icon} from "@ui-kitten/components";
import {Routes} from "../navigation/Route";

const CustomTabBar = ({ state, navigation }: BottomTabBarProps) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}
    >
        {state.routes.map((route, index) => (
            <BottomNavigationTab
                key={index}
                icon={<Icon name={getTabIcon(route.name)} />}
            />
        ))}
    </BottomNavigation>
)

const getTabIcon = (routeName: string) => {
    switch (routeName) {
        case Routes.HOME_SCREEN:
            return "home";
        case Routes.MAP_SCREEN:
            return "map";
        default:
            return "minus";
    }
}

export default CustomTabBar;
