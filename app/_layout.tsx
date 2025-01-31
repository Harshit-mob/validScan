import { Stack } from "expo-router";
import DeviceTypeProvider from "./providers/DeviceTypeProvider";
import NetworkProvider from "./providers/NetworkProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TranslationProvider from "./providers/TransalationProvider";
import {PaperProvider} from "react-native-paper";
import theme from "./utils/theme";
import {StatusBar} from 'expo-status-bar';
import { Provider } from 'react-redux';
import store from "./redux/store";
import SnackbarProvider from "./providers/SnakbarProvider";
import LoaderProvider from "./providers/LoaderProvider";


function Layout() {
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <TranslationProvider>
                    <DeviceTypeProvider>
                        <NetworkProvider>
                                <PaperProvider theme={theme}>
                                    <LoaderProvider>
                                        <SnackbarProvider>
                                            <Stack screenOptions={{ headerShown: false }} />
                                        </SnackbarProvider>
                                    </LoaderProvider>
                                </PaperProvider>
                        </NetworkProvider>
                    </DeviceTypeProvider>
                </TranslationProvider>
            </Provider>
            <StatusBar style="dark" translucent={true} />
        </SafeAreaProvider>
    );
}

export default Layout;
