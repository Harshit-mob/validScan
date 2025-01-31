import {StyleSheet} from "react-native";
import scale from "../../../utils/scaleResolutions";
import FontConstants from "../../../constants/FontConstants";

const createStyles = (colors) =>
 StyleSheet.create({
     mainContainer: {
         flex: 1,
         backgroundColor: colors.whiteBG
     },
    container: {
        flex: 1,
        justifyContent: "center",
        alignSelf: 'center',
        width: '50%',
        paddingHorizontal: scale(16),
        backgroundColor: colors.whiteBG
    },
    logoView: {
        alignItems: 'center',
        marginTop: scale(50),
    },
     labelView: {
         marginTop: scale(50),
         marginBottom: scale(30),
     },
    title: {
        fontSize: scale(32),
        fontFamily: FontConstants.NotoSansBold,
        textAlign: 'center',
        fontWeight: 'bold',
    },
     subTitle: {
         marginTop: scale(5),
         fontSize: scale(16),
         fontFamily: FontConstants.NotoSansRegular,
         textAlign: 'center',
         fontWeight: '400',
     },
     forgotRememberView: {
        flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'space-between',
         marginVertical: scale(5),
     },
     orText: {
         marginVertical: scale(20),
         textAlign: 'center',
         fontSize: scale(14),
         fontFamily:  FontConstants.NotoSansSemiBold,
         color: colors.textPrimary,
     }
});

export default createStyles;
