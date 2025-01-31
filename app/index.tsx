import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {View, StyleSheet, Image} from "react-native";
import useLoadFonts from "./hooks/useLoadFonts";
import RoutesConstants from "./constants/RoutesConstants";
import Images from "./constants/ImageConstants";
import scale from "./utils/scaleResolutions";

export default function Index() {
    const fontsLoaded = useLoadFonts();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null indicates loading

    useEffect(() => {
        // Simulate authentication check (replace with your logic)
        const checkAuth = async () => {
            setTimeout(() => {
                const userLoggedIn = false; // Change to true to simulate logged-in state
                setIsAuthenticated(userLoggedIn);
                if (userLoggedIn) {
                    router.replace(RoutesConstants.home); // Redirect to Dashboard
                } else {
                    router.replace(RoutesConstants.login); // Redirect to Login
                }
            }, 1000); // Simulated delay for authentication
        };

        checkAuth().then(r => console.log(r));
    }, []);

    if (!fontsLoaded && isAuthenticated === null) {
        // Show a loading indicator while checking authentication
        return (
            <View style={styles.container}>
                <Image source={Images.logo} style={{width: scale(400),resizeMode: 'cover'}}  />
            </View>
        );
    }

    return null; // No UI as redirection will happen
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
