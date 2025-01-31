import React from 'react';
import { StyleSheet, View, ViewStyle, Text } from 'react-native';
import {TextInput, HelperText, TextInputProps, MD3TypescaleKey} from 'react-native-paper';
import {useAppTheme} from "../utils/theme";
import scale from "../utils/scaleResolutions";

interface CommonTextInputProps extends Omit<TextInputProps, 'onChangeText' | 'value'> {
    label?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    error?: boolean;
    errorMessage?: string;
    placeholder?: string;
    disabled?: boolean;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'url' | 'decimal-pad';
    multiline?: boolean;
    numberOfLines?: number;
    leftButton?: React.ReactNode;
    rightButton?:  React.ReactNode;
    style?: ViewStyle;
}

const CommonTextInput: React.FC<CommonTextInputProps> = ({
                                                             label,
                                                             value,
                                                             onChangeText,
                                                             error,
                                                             errorMessage,
                                                             placeholder,
                                                             disabled = false,
                                                             secureTextEntry = false,
                                                             keyboardType = 'default',
                                                             multiline = false,
                                                             numberOfLines = 1,
                                                             leftButton,
                                                             rightButton,
                                                             style,
                                                             ...rest
                                                         }) => {
    const { colors } = useAppTheme();
    const styles = createStyles(colors);
    return (
        <View style={[styles.container, style]}>
            <TextInput
                label={label}
                // label={<Text style={styles.labelStyle}>{label}</Text>}
                value={value}
                onChangeText={onChangeText}
                mode="outlined" // Can also be 'flat'
                placeholder={placeholder}
                disabled={disabled}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                multiline={multiline}
                numberOfLines={numberOfLines}
                outlineColor={colors.grayStroke}
                activeOutlineColor={colors.primary}
                outlineStyle={styles.outlineStyles}
                error={error}
                left={leftButton ?? null}
                right={rightButton ?? null}
                style={styles.textInput}
                placeholderTextColor={colors.disabledText}
                textColor={colors.textPrimary}
                theme={{
                    colors: {
                      error: colors.errorText,
                    },
                    animation: {
                        scale:  scale(1)
                    },
                }}
                {...rest}
            />
            {error && errorMessage ? (
                <HelperText type="error" visible={error} style={styles.errorText}>
                    {errorMessage}
                </HelperText>
            ) : null}
        </View>
    );
};

const createStyles = (colors) => StyleSheet.create({
    container: {
        marginVertical: scale(8),
    },
    textInput: {
        backgroundColor: 'white',
        fontSize: scale(16),
        fontFamily: 'NotoSans-Regular',

    },
    outlineStyles: {
        borderRadius: scale(6),
        borderWidth: scale( 1),
        paddingHorizontal: scale(16),
    },
    labelStyle: {
        fontFamily: 'NotoSans-SemiBold',
        fontSize: scale(16),
        lineHeight: scale(16),
        color: colors.textSecondary,
    },
    floatingLabel: {
        fontFamily: 'NotoSans-SemiBold',
        fontSize: scale(14),
    },
    errorText: {
        fontFamily: 'NotoSans-SemiBold',
        marginTop: scale(5),
        fontSize: scale(14),
        lineHeight: scale(14),
    }
});

export default CommonTextInput;
