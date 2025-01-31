import React from 'react';
import { StyleSheet, View, Text, ViewStyle, TextStyle } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { useAppTheme } from "../utils/theme";
import scale from "../utils/scaleResolutions";

interface CommonCheckboxProps {
    label: string; // Text displayed next to the checkbox
    checked: boolean; // Checked state
    onPress: () => void; // Function to toggle the checkbox state
    disabled?: boolean; // Disable the checkbox
    labelStyle?: TextStyle; // Custom styles for the label
    containerStyle?: ViewStyle; // Custom styles for the checkbox container
}

const CommonCheckbox: React.FC<CommonCheckboxProps> = ({
                                                           label,
                                                           checked,
                                                           onPress,
                                                           disabled = false,
                                                           labelStyle,
                                                           containerStyle,
                                                       }) => {
    const { colors } = useAppTheme();
    const styles = createStyles(colors);

    return (
        <View style={[styles.container, containerStyle]}>
            <View
                style={[
                    styles.checkboxWrapper,
                    { transform: [{ scale: scale(1) }] }, // Dynamically scale the checkbox
                ]}
            >
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={onPress}
                    color={colors.primary}
                    disabled={disabled}
                    uncheckedColor={colors.grayStroke}

                />
            </View>
            <Text style={[styles.label, labelStyle, disabled && styles.disabledLabel]}>
                {label}
            </Text>
        </View>
    );
};

const createStyles = (colors: any) =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
        },
        label: {
            fontSize: scale(16),
            fontFamily: 'NotoSans-Regular',
            fontWeight: '400',
            color: colors.textSecondary,
            marginLeft: scale(5),
        },
        disabledLabel: {
            color: colors.disabled,
        },
    });

export default CommonCheckbox;
