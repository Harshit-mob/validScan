import {View, Text, Image } from "react-native";
import { useRouter } from "expo-router";
import {useAppTheme} from "../../../utils/theme";
import {useContext, useEffect, useState} from "react";
import RoutesConstants from "../../../constants/RoutesConstants";
import {SafeAreaView} from "react-native-safe-area-context";
import scale from "../../../utils/scaleResolutions";
import * as yup from 'yup';
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Images from "../../../constants/ImageConstants";
import {TranslationContext} from "../../../providers/TransalationProvider";
import CommonTextButton from "../../../components/CommonTextButton";
import CommonElevatedButton from "../../../components/CommonElevatedButton";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../redux/store";
import {useSnackbar} from "../../../providers/SnakbarProvider";
import createStyles from "./styles";
import {useLoader} from "../../../providers/LoaderProvider";
import {PaperOtpInput} from "react-native-paper-otp-input";
import FontConstants from "../../../constants/FontConstants";
import {getOtpSentEmail, verifyEmail, verifyOtp} from "../../../redux/auth/forgotPswSlice";

type FormData = {
    otp: string;
};

 function VerifyOtp() {
    const { t } = useContext(TranslationContext);
    const { colors } = useAppTheme();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { showMessage } = useSnackbar();
    const { showLoader, hideLoader } = useLoader();
    const  email = useSelector((state) => getOtpSentEmail(state))
     const [timer, setTimer] = useState(60); // Timer in seconds
     const [isResendEnabled, setIsResendEnabled] = useState(false); // Initially, disable the resend button

    const validationSchema = yup.object({
        otp: yup
            .string()
            .required(t('Login.emailRequired')),
    });

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(validationSchema),
    });

    const styles = createStyles(colors);

     useEffect(() => {
         const interval = setInterval(() => {
             setTimer((prev) => {
                 if (prev <= 1) {
                     clearInterval(interval);
                     setIsResendEnabled(true); // Enable resend OTP after 1 minute
                     return 0;
                 }
                 return prev - 1;
             });
         }, 1000);

         return () => clearInterval(interval); // Cleanup interval on unmount
     }, [isResendEnabled]);

    const onSubmit = async (data: FormData) => {
        console.log('data', data, email)
        try {
            showLoader();
            const response = await dispatch(verifyOtp({ email: email, otp: data.otp }));

            hideLoader();

            if (response.payload.status) {
                showMessage(response.payload.message || "OTP verification successfully.", "success"); // Show success message
                router.replace(RoutesConstants.resetPsw); // Navigate to dashboard
            } else {
                showMessage(response.payload.message || "OTP verification failed", "error"); // Show error message
            }
        } catch (error) {

            hideLoader();
            showMessage(error.message || t('Login.error'), "error"); // Show error message
        }
    };

     const formatTime = (seconds: number) => {
         const minutes = Math.floor(seconds / 60); // Get minutes part
         const remainingSeconds = seconds % 60; // Get seconds part
         return `${minutes < 10 ? '0' + minutes : minutes}:${remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds}`;
     };

     const onResendOTP = async () => {
         try {
            showLoader();
             const response = await dispatch(verifyEmail({ email: email }));
             hideLoader();
             if (response.payload.status) {
                 setIsResendEnabled(false);
                 setTimer(60);
                 showMessage(response.payload.message, "success"); // Show success message
             } else {
                 showMessage(response.payload.message || "OTP Resent failed", "error"); // Show error message
             }
         } catch (error) {
             showMessage(error.message || t('Login.error'), "error"); // Show error message
         }

     }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.container}>
                <View style={styles.logoView}>
                    <Image source={Images.logo} style={{width: scale(400),resizeMode: 'cover'}}  />
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <View style={styles.labelView}>
                        <Text style={styles.title}>{t('VerifyOtp.titleText')}</Text>
                        <Text style={styles.subTitle}>{t('VerifyOtp.subText')}</Text>
                    </View>
                    <Controller
                        control={control}
                        name="otp"
                        render={({ field: { onChange, value } }) => (
                            <PaperOtpInput
                                autoFocus={true}
                                otpTextStyle={{
                                    fontFamily: FontConstants.NotoSansBold,
                                    fontSize: scale(24), // Increase font size
                                    fontWeight: 'bold',  // Optional: Make text bolder
                                }}
                                otpBorderColor={colors.grayStroke}
                                otpBorderFocusedColor={colors.primary}
                                otpBoxStyle={{
                                    backgroundColor: colors.whiteBG,
                                    maxWidth: scale(67),
                                    minWidth: scale(67),
                                    maxHeight: scale(51),
                                    minHeight:scale(51),
                                    borderRadius: scale(4), // Optional: Add rounded corners
                                    justifyContent: 'center', // Center text vertically
                                    alignItems: 'center', // Center text horizontally
                                    borderWidth: scale(1),
                                }}
                                onPinChange={(pin) => {
                                    onChange(pin);
                                }}
                                maxLength={6}
                            />
                        )}
                    />

                    <CommonElevatedButton
                        text={t('VerifyOtp.verifyBtn')}
                        onPress={handleSubmit(onSubmit)}
                    />

                    <View style={styles.resendCodeView}>
                        <Text style={styles.notGetOtpText}>{t('VerifyOtp.notGetOTP')}</Text>
                        <CommonTextButton
                            style={styles.resendOtpView}
                            textStyle={styles.resendOtpText}
                            text={t('VerifyOtp.resendCodeText')}
                            onPress={() => onResendOTP()}
                            disabled={!isResendEnabled}
                        />
                        {!isResendEnabled  &&
                            <Text style={styles.timerText}>{t('VerifyOtp.inText')} {formatTime(timer)}</Text>
                        }
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default VerifyOtp;
