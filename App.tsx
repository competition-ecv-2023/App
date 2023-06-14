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

Sentry.init({
    dsn: 'https://12db23e3737640f39f3457fa196f928f@o4505351183073280.ingest.sentry.io/4505351190872064',
    enableInExpoDevelopment: true,
    debug: true,
})

const queryClient = new QueryClient();

export default function App() {
    try {
        return (
            <>
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
            </>
        );
    } catch (e) {
        Sentry.Native.captureException(e);
    }
}
