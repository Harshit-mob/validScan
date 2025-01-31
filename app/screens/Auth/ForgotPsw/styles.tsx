import { StyleSheet } from "react-native";
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
     resendCodeView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
         alignContent: 'center',
        marginTop: scale(20)
     },
     notGetOtpText: {
       color: colors.textSecondary,
       fontFamily: FontConstants.NotoSansRegular,
       fontWeight: '400',
       fontSize: scale(14),
       lineHeight: scale(22.4),

     },
     resendOtpView: {
         marginLeft: scale(2)
     },
     resendOtpText: {
         textDecorationLine: 'underline',
         fontSize: scale(18),
     },
     timerText: {
         marginLeft: scale(2),
         color: colors.primary,
         fontFamily: FontConstants.NotoSansSemiBold,
         fontWeight: '700',
         fontSize: scale(18)
     }
});

export default createStyles;
