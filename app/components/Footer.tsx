import {View, StyleSheet} from "react-native";
import {Button} from "react-native-paper";

const Footer = () => {
    return (
        <View style={styles.footer}>
            <Button mode="text" onPress={() => console.log('Privacy Policy')}>
                Privacy Policy
            </Button>
            <Button mode="text" onPress={() => console.log('Powered by CerfAir')}>
                Powered by CerfAir
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
});

export default Footer;
