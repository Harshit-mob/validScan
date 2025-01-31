import React, { useRef } from 'react';
import { Animated, ScrollView, Text, View, StyleSheet, SafeAreaView } from 'react-native';


const Dashboard = () => {


    return (
        <View style={styles.container}>
            <Text >Home Screen</Text>
        </View>
        // <SafeAreaView style={styles.container}>
        //
        //
        //     <ScrollView
        //         onScroll={Animated.event(
        //             [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        //             { useNativeDriver: false }
        //         )}
        //         scrollEventThrottle={16}
        //     >
        //         <View style={styles.content}>
        //             <Text style={styles.notificationHeader}>Notifications</Text>
        //             {['Notification 1', 'Notification 2', 'Notification 3'].map((notification, index) => (
        //                 <Text key={index} style={styles.notification}>{notification}</Text>
        //             ))}
        //
        //             <Text style={styles.menuHeader}>Menu</Text>
        //             {['Admin', 'Company', 'Customer', 'Jobs', 'Users', 'Equipments', 'Reports', 'Test'].map((item, index) => (
        //                 <Text key={index} style={styles.menuItem}>{item}</Text>
        //             ))}
        //         </View>
        //     </ScrollView>
        //
        //     <View style={styles.footer}>
        //         <Text style={styles.footerText}>@All rights reserved</Text>
        //         <Text style={styles.footerText}>Powered by - CerfAir</Text>
        //         <Text style={styles.footerText}>Privacy Policy</Text>
        //     </View>
        // </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    drawerOpen: {
        width: 200,
    },
    drawerClosed: {
        width: 0,
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#6200ee',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    dateTime: {
        color: 'white',
        fontSize: 14,
    },
    welcomeText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 10,
    },
    content: {
        padding: 16,
        paddingTop: 150, // Adjust based on header height
    },
    notificationHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    notification: {
        fontSize: 16,
        marginBottom: 8,
    },
    menuHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    menuItem: {
        fontSize: 16,
        marginBottom: 8,
    },
    footer: {
        backgroundColor: '#333',
        padding: 10,
        alignItems: 'center',
    },
    footerText: {
        color: 'white',
        fontSize: 12,
    },
});

export default Dashboard;
