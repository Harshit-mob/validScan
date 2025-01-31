// theme.js
import {DefaultTheme as PaperDefaultTheme, ThemeBase, useTheme} from 'react-native-paper';
import {scale} from "./scaleResolutions";

 const theme = {
    ...PaperDefaultTheme, // Extend Paper's default theme
    colors: {
        ...PaperDefaultTheme.colors, // Include Paper's default colors

        // Custom colors
        primary: '#7836F8',
        secondary: '#51D2DA',
        textPrimary: '#1C1C1C',
        textSecondary: '#666666',
        buttonText: '#FFFFFF',
        disabledText: '#9E9E9E',
        warningText: '#EF6C00',
        errorText: '#D32F2F',
        successText: '#2E7D32',
        infoText: '#0288D1',

        focusStroke: '#7836F8',
        grayStroke: '#CCCCCC',
        dividerStroke: '#E0E0E0',
        validationStroke: '#FFF4E5',
        errorStroke: '#FDEDED',

        whiteBG: '#ffffff',
        disabledBG: '#EBEBEB',
        validationBG: '#FFF4E5',
        successBG: '#EDF7ED',
        infoBG: '#E5F6FD',
        errorBG: '#FDEDED',
        warningBG: '#FFF4E5',

        // Purple shades
        purple: {
            50: '#F2EBFE',
            100: '#E4D8FE',
            200: '#CAB0FC',
            300: '#AF89FB',
            400: '#915CF9',
            500: '#7836F8',
            600: '#5E1DDD',
            700: '#3F06B1',
            800: '#2A0476',
            900: '#15023B',
            950: '#0B011E',
        },

        //gray shades
        gray: {
            50: '#F0F0F0',
            100: '#E0E0E0',
            200: '#C2C2C2',
            300: '#A3A3A3',
            400: '#858585',
            500: '#666666',
            600: '#525252',
            700: '#3D3D3D',
            800: '#292929',
            900: '#141414',
            950: '#0A0A0A',
        },
    },

};

export type AppTheme = typeof theme;

export const useAppTheme = () => useTheme<AppTheme>();

export default theme;
