import React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import scale from "../utils/scaleResolutions";

// Define props for the ElevatedButton component
interface ElevatedButtonProps {
    text: string;
    onPress: () => void;
    style?: ViewStyle; // Optional style for the button container
    textStyle?: TextStyle; // Optional style for the button label
    disabled?: boolean; // Optional prop to disable the button
}

const CommonElevatedButton: React.FC<ElevatedButtonProps> = ({ text, onPress, style, textStyle, disabled = false }) => {
    return (
        <Button
            mode="contained"
            onPress={onPress}
            style={[styles.button, style]}  // Combine default and custom button styles
            contentStyle={styles.content}  // Content styling inside the button
            labelStyle={[styles.label, textStyle]}  // Styling for the text inside the button
            disabled={disabled}  // Disable the button if the prop is true
        >
            {text}
        </Button>
    );
};

// Default styles for the button
const styles = StyleSheet.create({
    button: {
        marginTop: scale(30),
        borderRadius: scale(6),
        height: scale(50),
        justifyContent: 'center',
    },
    content: {
        height: scale(49),
        alignContent: 'center',
    },
    label: {
        fontSize: scale(16),
        lineHeight: scale(22.4),
        fontWeight: '500',
        textAlign: 'center',
    },
});

export default CommonElevatedButton;
