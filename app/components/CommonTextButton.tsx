import React from 'react';
import {Button, ButtonProps, Icon} from 'react-native-paper';
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import scale from "../utils/scaleResolutions";

// Define props for the CommonTextButton component
interface CommonTextButtonProps {
    text: string;
    onPress: () => void;
    disabled?: boolean;
    icon?: string;
    iconSize?: number;
    style?: ViewStyle; // Optional style for the button container
    textStyle?: TextStyle; // Optional style for the button label
}

const CommonTextButton: React.FC<CommonTextButtonProps> = ({ text,icon,iconSize, onPress, disabled = false, style, textStyle }) => {
    return (
        <Button
            mode="text"
            onPress={onPress}
            disabled={disabled}
            icon={icon ? ({ size, color }) => (
                <Icon source={icon} size={iconSize || size} color={color} />
            ) : undefined}
            labelStyle={[
                styles.label,
                textStyle,  // Allow overriding the text style
            ]}
            style={style}  // Allow overriding the button container style
        >
            {text}
        </Button>
    );
};

// Default styles for the label
const styles = StyleSheet.create({
    label: {
        fontSize: scale(16),
        lineHeight: scale(22.4),
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default CommonTextButton;
