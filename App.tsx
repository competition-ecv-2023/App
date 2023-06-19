import {StatusBar} from 'expo-status-bar';
import * as Sentry from 'sentry-expo';
import {NavigationContainer} from "@react-navigation/native";
import Navigator from "./src/navigation/Navigator";
import {ApplicationProvider, IconRegistry} from "@ui-kitten/components";
import * as eva from '@eva-design/eva';
import {AuthenticationProvider} from "./src/context/Authentication";
import {FeatherIconsPack} from "./src/icons/feather-icons";
import {IoniconsIconsPack} from "./src/icons/ionicons-icons";
import {default as theme} from './assets/theme.json';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import {useFonts} from "expo-font";
import {useCallback} from "react";
import {View} from "react-native";

SplashScreen.preventAutoHideAsync();

Sentry.init({
    dsn: 'https://12db23e3737640f39f3457fa196f928f@o4505351183073280.ingest.sentry.io/4505351190872064',
    enableInExpoDevelopment: true,
    debug: false,
})

const queryClient = new QueryClient();

export default function App() {
    const [fontsLoaded] = useFonts({
        'Sans-Poster-Bold': require('./assets/fonts/Sanspstb.ttf'),
        'Work-Sans-900': require('./assets/fonts/WorkSans-Black.ttf'),
        'Work-Sans-800': require('./assets/fonts/WorkSans-ExtraBold.ttf'),
        'Work-Sans-700': require('./assets/fonts/WorkSans-Bold.ttf'),
        'Work-Sans-500': require('./assets/fonts/WorkSans-Medium.ttf'),
    })

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    try {
        return (
            <View style={{flex: 1}} onLayout={onLayoutRootView}>
                <IconRegistry icons={[FeatherIconsPack, IoniconsIconsPack]}/>
                <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
                    <QueryClientProvider client={queryClient}>
                        <NavigationContainer>
                            <AuthenticationProvider>
                                <StatusBar style="auto"/>
                                <Navigator/>
                            </AuthenticationProvider>
                        </NavigationContainer>
                    </QueryClientProvider>
                </ApplicationProvider>
            </View>
        );
    } catch (e) {
        Sentry.Native.captureException(new Error(e as string));
    }
}
