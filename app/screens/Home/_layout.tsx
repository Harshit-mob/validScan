
import { View, StyleSheet } from "react-native";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {Drawer} from "expo-router/drawer";
import RoutesConstants from "../../constants/RoutesConstants";


export default function DashboardLayout() {
    return (

            <View style={styles.container}>
                    {/* Common Header */}
                    <Header />

                    {/* Drawer Navigation */}
                    <View style={styles.drawerContainer}>
                        <Drawer screenOptions={{ headerShown: false }}>
                            <Drawer.Screen name="index"  options={{
                                drawerLabel: 'Home',
                                title: 'overview',
                            }} />
                        </Drawer>

                    </View>

                    {/* Common Footer */}
                    <Footer />
                </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    drawerContainer: { flex: 1 }
});
