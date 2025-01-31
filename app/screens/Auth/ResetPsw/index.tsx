import {View, Text, Image} from "react-native";
import { useRouter } from "expo-router";
import {useAppTheme} from "../../../utils/theme";
import {useContext, useState} from "react";
import {TextInput} from "react-native-paper";
import RoutesConstants from "../../../constants/RoutesConstants";
import {SafeAreaView} from "react-native-safe-area-context";
import scale from "../../../utils/scaleResolutions";
import * as yup from 'yup';
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Images from "../../../constants/ImageConstants";
import {TranslationContext} from "../../../providers/TransalationProvider";
import CommonElevatedButton from "../../../components/CommonElevatedButton";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../../redux/store";
import {useSnackbar} from "../../../providers/SnakbarProvider";
import createStyles from "./styles";
import {useLoader} from "../../../providers/LoaderProvider";
import OutlinedTextInput from "../../../components/OutlinedTextInput";
import {getResetToken, resetPassword} from "../../../redux/auth/forgotPswSlice";

type FormData = {
    password: string;
    confirmPassword: string;
};

export default function ResetPsw() {
    const { t } = useContext(TranslationContext);
    const { colors } = useAppTheme();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { showMessage } = useSnackbar();
    const { showLoader, hideLoader } = useLoader();
    const resetToken = useSelector((state) => getResetToken(state))

    const validationSchema = yup.object({
        password: yup
            .string()
            .min(8, t('Login.passwordInvalid'))
            .required(t('Login.passwordRequired')),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password')], 'Passwords must match')
            .required(t('Login.passwordRequired')),
    });

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(validationSchema),
    });

    const [showPsw, setShowPsw] = useState(true);

    const styles = createStyles(colors);


    const onSubmit = async (data: FormData) => {
        try {
            showLoader();
            console.log('resetToken', resetToken)
            const response = await dispatch(resetPassword({ password: data.password, resetToken: resetToken }));
            console.log('response', response)
            hideLoader();
            if (response.payload.status) {
                router.replace(RoutesConstants.resetSuccess); // Navigate to dashboard
            } else {
                showMessage(response.payload.message || "Reset Password failed", "error"); // Show error message
            }
        } catch (error) {
            console.log("error", error);
            hideLoader();
            showMessage(error.message || t('Login.error'), "error"); // Show error message
        }
    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.container}>
                <View style={styles.logoView}>
                    <Image source={Images.logo} style={{width: scale(400),resizeMode: 'cover'}}  />
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <View style={styles.labelView}>
                        <Text style={styles.title}>{t('ResetPsw.titleText')}</Text>
                        <Text style={styles.subTitle}>{t('ResetPsw.subText')}</Text>
                    </View>
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <OutlinedTextInput
                                label={t('ResetPsw.newPsw')}
                                value={value}
                                onChangeText={onChange}
                                placeholder={t('ResetPsw.newPswPlaceHolder')}
                                secureTextEntry={showPsw}
                                error={!!errors.password}
                                errorMessage={errors.password?.message}
                                style={{marginTop: scale(10),}}
                                rightButton={
                                    value &&
                                    <TextInput.Icon
                                        icon={showPsw ? 'eye-off-outline'  : 'eye-outline'}
                                        onPress={() => setShowPsw(!showPsw)}
                                        size={scale(20)}
                                        color={colors.disabledText}
                                    />}
                            />)}
                    />
                    <Controller
                        control={control}
                        name="confirmPassword"
                        render={({ field: { onChange, value } }) => (
                            <OutlinedTextInput
                                label={t('ResetPsw.confirmPsw')}
                                value={value}
                                onChangeText={onChange}
                                placeholder={t('ResetPsw.confirmPswPlaceHolder')}
                                secureTextEntry={showPsw}
                                error={!!errors.confirmPassword}
                                errorMessage={errors.confirmPassword?.message}
                                style={{marginTop: scale(10),}}
                                rightButton={
                                    value &&
                                    <TextInput.Icon
                                        icon={showPsw ? 'eye-off-outline'  : 'eye-outline'}
                                        onPress={() => setShowPsw(!showPsw)}
                                        size={scale(20)}
                                        color={colors.disabledText}
                                    />}
                            />)}
                    />

                    <CommonElevatedButton text={t('ResetPsw.resetPsw')} onPress={handleSubmit(onSubmit)} />

                </View>
            </View>
        </SafeAreaView>
    );
}
