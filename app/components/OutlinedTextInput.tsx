import React, {useState, useRef, forwardRef} from 'react';
import {
    View,
    TextInput as RNTextInput,
    Animated,
    StyleSheet,
    Text,
} from 'react-native';
import scale from "../utils/scaleResolutions";
import {useAppTheme} from "../utils/theme";
import FontConstants from "../constants/FontConstants";


const OutlinedTextInput =  forwardRef(({
                                           label,
                                           value,
                                           onChangeText,
                                           onSubmitEditing,
                                           placeholder,
                                           error,
                                           errorMessage,
                                           secureTextEntry = false,
                                           keyboardType = 'default',
                                           multiline = false,
                                           numberOfLines = 1,
                                           leftIcon,
                                           rightButton,
                                           style = {},
                                           inputStyle = {},
                                           labelStyle = {},
                                           borderColor,
                                           activeBorderColor,
                                           textColor,
                                           errorColor,
                                           placeholderTextColor,
                                       }, ref) => {
    const { colors } = useAppTheme();
    const styles = createStyles(colors);
    const [isFocused, setIsFocused] = useState(false);
    const animatedLabel = useRef(new Animated.Value(value ? 1 : 0)).current;

    const handleFocus = () => {
        setIsFocused(true);
        Animated.timing(animatedLabel, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (!value) {
            Animated.timing(animatedLabel, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start();
        }
    };

    const labelPosition = animatedLabel.interpolate({
        inputRange: [0, 1],
        outputRange: [scale(12), scale(-10)],
    });

    const labelFontSize = animatedLabel.interpolate({
        inputRange: [0, 1],
        outputRange: [scale(16), scale(14)],
    });

    return (
        <View style={[styles.container, style]}>
            <View
                style={[
                    styles.inputContainer,
                    {
                        borderColor: error ? (errorColor ?? colors.errorText) : isFocused ? (activeBorderColor ?? colors.primary) : (borderColor ?? colors.grayStroke),
                    },
                ]}
            >
                {leftIcon && <View style={styles.icon}>{leftIcon}</View>}

                <Animated.Text
                    style={[
                        styles.label,
                        {
                            top: labelPosition,
                            fontSize: labelFontSize,
                            color: error ? (errorColor ?? colors.errorText) : isFocused ? (activeBorderColor ?? colors.primary) : (borderColor ?? colors.textSecondary),
                        },
                        labelStyle,
                    ]}
                >
                    {label}
                </Animated.Text>

                <RNTextInput
                    ref={ref}
                    value={value}
                    onChangeText={onChangeText}
                    onSubmitEditing={onSubmitEditing}
                    placeholder={isFocused ? placeholder : ''}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={[
                        styles.input,
                        {
                            color: (textColor && colors.textPrimary),
                        },
                        inputStyle,
                    ]}
                    placeholderTextColor={(placeholderTextColor && colors.disabledText)}
                />
                {rightButton && <View style={styles.icon}>
                    {rightButton}
                </View>}
            </View>

            {error && errorMessage ? (
                <Text style={[styles.errorText, { color: (errorColor ?? colors.errorText) }]}>{errorMessage}</Text>
            ) : null}
        </View>
    );
});

const createStyles = (colors) => StyleSheet.create({
    container: {
        marginVertical: scale(8),
    },
    inputContainer: {
        borderWidth: scale(1),
        borderRadius: scale(6),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.whiteBG,
        position: 'relative',
        height: scale(50),
        justifyContent: 'flex-start',
        alignContent: 'center'
    },
    label: {
        position: 'absolute',
        left: scale(12),
        backgroundColor: '#FFF',
        paddingHorizontal: scale(6),
        fontFamily: FontConstants.NotoSansSemiBold,
        zIndex: 0,
    },
    input: {
        flex: 1,
        paddingHorizontal: scale(12),
        width: '100%',
        height: '100%',
        fontSize: scale(16),
        fontFamily: FontConstants.NotoSansRegular,
    },
    icon: {
        marginHorizontal: scale(20),
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorText: {
        fontSize: scale(14),
        marginTop: scale(4),
        fontFamily: FontConstants.NotoSansRegular,
    },
});

export default OutlinedTextInput;
