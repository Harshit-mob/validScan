import { useFonts } from 'expo-font';
import FontConstants from "../constants/FontConstants";

export default function useLoadFonts() {

    const [fontsLoaded] = useFonts({
        [FontConstants.NotoSansSemiCondensedLightItalic]: require('../../assets/fonts/NotoSans_SemiCondensed-LightItalic.ttf'),
        [FontConstants.NotoSansSemiCondensedBoldItalic]: require('../../assets/fonts/NotoSans_SemiCondensed-BoldItalic.ttf'),
        [FontConstants.NotoSansExtraCondensedBoldItalic]: require('../../assets/fonts/NotoSans_ExtraCondensed-BoldItalic.ttf'),
        [FontConstants.NotoSansExtraCondensedSemiBold]: require('../../assets/fonts/NotoSans_ExtraCondensed-SemiBold.ttf'),
        [FontConstants.NotoSansExtraCondensedSemiBoldItalic]: require('../../assets/fonts/NotoSans_ExtraCondensed-SemiBoldItalic.ttf'),
        [FontConstants.NotoSansRegular]: require('../../assets/fonts/NotoSans-Regular.ttf'),
        [FontConstants.NotoSansSemiCondensedMedium]: require('../../assets/fonts/NotoSans_SemiCondensed-Medium.ttf'),
        [FontConstants.NotoSansExtraCondensedBlackItalic]: require('../../assets/fonts/NotoSans_ExtraCondensed-BlackItalic.ttf'),
        [FontConstants.NotoSansExtraCondensedExtraLight]: require('../../assets/fonts/NotoSans_ExtraCondensed-ExtraLight.ttf'),
        [FontConstants.NotoSansSemiCondensedExtraLight]: require('../../assets/fonts/NotoSans_SemiCondensed-ExtraLight.ttf'),
        [FontConstants.NotoSansSemiCondensedThinItalic]: require('../../assets/fonts/NotoSans_SemiCondensed-ThinItalic.ttf'),
        [FontConstants.NotoSansExtraCondensedBold]: require('../../assets/fonts/NotoSans_ExtraCondensed-Bold.ttf'),
        [FontConstants.NotoSansCondensedMediumItalic]: require('../../assets/fonts/NotoSans_Condensed-MediumItalic.ttf'),
        [FontConstants.NotoSansExtraCondensedThinItalic]: require('../../assets/fonts/NotoSans_ExtraCondensed-ThinItalic.ttf'),
        [FontConstants.NotoSansCondensedItalic]: require('../../assets/fonts/NotoSans_Condensed-Italic.ttf'),
        [FontConstants.NotoSansExtraCondensedExtraBold]: require('../../assets/fonts/NotoSans_ExtraCondensed-ExtraBold.ttf'),
        [FontConstants.NotoSansSemiCondensedBlack]: require('../../assets/fonts/NotoSans_SemiCondensed-Black.ttf'),
        [FontConstants.NotoSansExtraCondensedThin]: require('../../assets/fonts/NotoSans_ExtraCondensed-Thin.ttf'),
        [FontConstants.NotoSansSemiCondensedSemiBoldItalic]: require('../../assets/fonts/NotoSans_SemiCondensed-SemiBoldItalic.ttf'),
        [FontConstants.NotoSansMedium]: require('../../assets/fonts/NotoSans-Medium.ttf'),
        [FontConstants.NotoSansCondensedRegular]: require('../../assets/fonts/NotoSans_Condensed-Regular.ttf'),
        [FontConstants.NotoSansCondensedLightItalic]: require('../../assets/fonts/NotoSans_Condensed-LightItalic.ttf'),
        [FontConstants.NotoSansExtraCondensedLight]: require('../../assets/fonts/NotoSans_ExtraCondensed-Light.ttf'),
        [FontConstants.NotoSansSemiCondensedExtraBoldItalic]: require('../../assets/fonts/NotoSans_SemiCondensed-ExtraBoldItalic.ttf'),
        [FontConstants.NotoSansCondensedExtraLightItalic]: require('../../assets/fonts/NotoSans_Condensed-ExtraLightItalic.ttf'),
        [FontConstants.NotoSansExtraCondensedMediumItalic]: require('../../assets/fonts/NotoSans_ExtraCondensed-MediumItalic.ttf'),
        [FontConstants.NotoSansCondensedBlackItalic]: require('../../assets/fonts/NotoSans_Condensed-BlackItalic.ttf'),
        [FontConstants.NotoSansMediumItalic]: require('../../assets/fonts/NotoSans-MediumItalic.ttf'),
        [FontConstants.NotoSansCondensedExtraBoldItalic]: require('../../assets/fonts/NotoSans_Condensed-ExtraBoldItalic.ttf'),
        [FontConstants.NotoSansCondensedBold]: require('../../assets/fonts/NotoSans_Condensed-Bold.ttf'),
        [FontConstants.NotoSansBlack]: require('../../assets/fonts/NotoSans-Black.ttf'),
        [FontConstants.NotoSansBold]: require('../../assets/fonts/NotoSans-Bold.ttf'),
        [FontConstants.NotoSansThin]: require('../../assets/fonts/NotoSans-Thin.ttf'),
        [FontConstants.NotoSansSemiCondensedRegular]: require('../../assets/fonts/NotoSans_SemiCondensed-Regular.ttf'),
        [FontConstants.NotoSansCondensedThin]: require('../../assets/fonts/NotoSans_Condensed-Thin.ttf'),
        [FontConstants.NotoSansSemiCondensedBlackItalic]: require('../../assets/fonts/NotoSans_SemiCondensed-BlackItalic.ttf'),
        [FontConstants.NotoSansExtraCondensedMedium]: require('../../assets/fonts/NotoSans_ExtraCondensed-Medium.ttf'),
        [FontConstants.NotoSansExtraCondensedLightItalic]: require('../../assets/fonts/NotoSans_ExtraCondensed-LightItalic.ttf'),
        [FontConstants.NotoSansCondensedLight]: require('../../assets/fonts/NotoSans_Condensed-Light.ttf'),
        [FontConstants.NotoSansExtraCondensedExtraLightItalic]: require('../../assets/fonts/NotoSans_ExtraCondensed-ExtraLightItalic.ttf'),
        [FontConstants.NotoSansSemiCondensedSemiBold]: require('../../assets/fonts/NotoSans_SemiCondensed-SemiBold.ttf'),
        [FontConstants.NotoSansCondensedBlack]: require('../../assets/fonts/NotoSans_Condensed-Black.ttf'),
        [FontConstants.NotoSansSemiBold]: require('../../assets/fonts/NotoSans-SemiBold.ttf'),
        [FontConstants.NotoSansExtraCondensedExtraBoldItalic]: require('../../assets/fonts/NotoSans_ExtraCondensed-ExtraBoldItalic.ttf'),
        [FontConstants.NotoSansCondensedSemiBoldItalic]: require('../../assets/fonts/NotoSans_Condensed-SemiBoldItalic.ttf'),
        [FontConstants.NotoSansSemiBoldItalic]: require('../../assets/fonts/NotoSans-SemiBoldItalic.ttf'),
        [FontConstants.NotoSansLightItalic]: require('../../assets/fonts/NotoSans-LightItalic.ttf'),
        [FontConstants.NotoSansExtraCondensedRegular]: require('../../assets/fonts/NotoSans_ExtraCondensed-Regular.ttf'),
        [FontConstants.NotoSansLight]: require('../../assets/fonts/NotoSans-Light.ttf'),
        [FontConstants.NotoSansExtraCondensedItalic]: require('../../assets/fonts/NotoSans_ExtraCondensed-Italic.ttf'),
        [FontConstants.NotoSansBoldItalic]: require('../../assets/fonts/NotoSans-BoldItalic.ttf'),
        [FontConstants.NotoSansCondensedSemiBold]: require('../../assets/fonts/NotoSans_Condensed-SemiBold.ttf'),
        [FontConstants.NotoSansCondensedExtraBold]: require('../../assets/fonts/NotoSans_Condensed-ExtraBold.ttf'),
        [FontConstants.NotoSansCondensedMedium]: require('../../assets/fonts/NotoSans_Condensed-Medium.ttf'),
        [FontConstants.NotoSansBlackItalic]: require('../../assets/fonts/NotoSans-BlackItalic.ttf'),
        [FontConstants.NotoSansSemiCondensedLight]: require('../../assets/fonts/NotoSans_SemiCondensed-Light.ttf'),
        [FontConstants.NotoSansExtraBoldItalic]: require('../../assets/fonts/NotoSans-ExtraBoldItalic.ttf'),
        [FontConstants.NotoSansExtraCondensedBlack]: require('../../assets/fonts/NotoSans_ExtraCondensed-Black.ttf'),
        [FontConstants.NotoSansSemiCondensedBold]: require('../../assets/fonts/NotoSans_SemiCondensed-Bold.ttf'),
        [FontConstants.NotoSansExtraLight]: require('../../assets/fonts/NotoSans-ExtraLight.ttf'),
        [FontConstants.NotoSansSemiCondensedExtraBold]: require('../../assets/fonts/NotoSans_SemiCondensed-ExtraBold.ttf'),
        [FontConstants.NotoSansThinItalic]: require('../../assets/fonts/NotoSans-ThinItalic.ttf'),
        [FontConstants.NotoSansSemiCondensedItalic]: require('../../assets/fonts/NotoSans_SemiCondensed-Italic.ttf'),
        [FontConstants.NotoSansSemiCondensedMediumItalic]: require('../../assets/fonts/NotoSans_SemiCondensed-MediumItalic.ttf'),
        [FontConstants.NotoSansExtraLightItalic]: require('../../assets/fonts/NotoSans-ExtraLightItalic.ttf'),
        [FontConstants.NotoSansCondensedBoldItalic]: require('../../assets/fonts/NotoSans_Condensed-BoldItalic.ttf'),
        [FontConstants.NotoSansSemiCondensedThin]: require('../../assets/fonts/NotoSans_SemiCondensed-Thin.ttf'),
        [FontConstants.NotoSansSemiCondensedExtraLightItalic]: require('../../assets/fonts/NotoSans_SemiCondensed-ExtraLightItalic.ttf'),
        [FontConstants.NotoSansCondensedExtraLight]: require('../../assets/fonts/NotoSans_Condensed-ExtraLight.ttf'),
        [FontConstants.NotoSansExtraBold]: require('../../assets/fonts/NotoSans-ExtraBold.ttf'),
        [FontConstants.NotoSansCondensedThinItalic]: require('../../assets/fonts/NotoSans_Condensed-ThinItalic.ttf'),
        [FontConstants.NotoSansItalic]: require('../../assets/fonts/NotoSans-Italic.ttf'),
    });

    return fontsLoaded;
}
