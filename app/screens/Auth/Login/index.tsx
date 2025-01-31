import {View, Text, Image, TextInput as RNTextInput} from "react-native";
import { useRouter } from "expo-router";
import {useAppTheme} from "../../../utils/theme";
import {useContext, useRef, useState} from "react";

import CommonCheckbox from "../../../components/CommonCheckbox";
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
import {useDispatch} from "react-redux";
import {loginUser} from "../../../redux/auth/loginSlice";
import {AppDispatch} from "../../../redux/store";
import {useSnackbar} from "../../../providers/SnakbarProvider";
import createStyles from "./styles";
import {useLoader} from "../../../providers/LoaderProvider";
import OutlinedTextInput from "../../../components/OutlinedTextInput";
import {TextInput} from "react-native-paper";
import {authenticateWithBiometrics} from "../../../services/BiometricAuth";

type FormData = {
    email: string;
    password: string;
    rememberMe: boolean;
};

export default function Login() {
    const { t } = useContext(TranslationContext);
    const { colors } = useAppTheme();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { showMessage } = useSnackbar();
    const { showLoader, hideLoader } = useLoader();
    const passwordRef = useRef<RNTextInput>(null);

    const validationSchema = yup.object({
        email: yup
            .string()
            .email(t('Login.emailInvalid'))
            .required(t('Login.emailRequired')),
        password: yup
            .string()
            .min(8, t('Login.passwordInvalid'))
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
            const response = await dispatch(loginUser({ email: data.email, password: data.password }));
            console.log('response', response)
            hideLoader();
            if (response.payload.status) {
                showMessage(response.payload.message || "Login successful", "success"); // Show success message
                router.replace(RoutesConstants.homeScreen); // Navigate to dashboard
            } else {
                showMessage(response.payload.message || "Login failed", "error"); // Show error message
            }
        } catch (error) {
            console.log("error", error);
            hideLoader();
            showMessage(error.message || t('Login.error'), "error"); // Show error message
        }
    };

    const handleBiometricAuth = async () => {
        const result = await authenticateWithBiometrics();

        if (!result.success) {
            showMessage(result.message,  'error');
        } else {
            showMessage("You are authenticated!", "success");
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
                    <Text style={styles.title}>{t('Login.Welcome')}</Text>
                    <Text style={styles.subTitle}>{t('Login.subText')}</Text>
                </View>
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <OutlinedTextInput
                            label={t('Login.email')}
                            value={value}
                            onChangeText={onChange}
                            error={!!errors.email}
                            errorMessage={errors.email?.message}
                            placeholder={t('Login.emailPlaceHolder')}
                            keyboardType="email-address"
                            onSubmitEditing={() => passwordRef.current.focus()}
                        />)}
                />
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                    <OutlinedTextInput
                        ref={passwordRef}
                        label={t('Login.password')}
                        value={value}
                        onChangeText={onChange}
                        placeholder={t('Login.passwordPlaceHolder')}
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
                <View style={styles.forgotRememberView}>
                    <Controller
                        control={control}
                        name="rememberMe"
                        render={({ field: { onChange, value } }) => (
                                <CommonCheckbox
                                    label={t('Login.rememberText')}
                                    checked={value}
                                    onPress={() => onChange(!value)}
                                />
                            )}
                        />
                    <CommonTextButton text={t('Login.forgotPswText')} onPress={() => {
                        router.replace(RoutesConstants.forgotPsw);
                    }} />
                </View>
                <CommonElevatedButton text={t('Login.loginText')} onPress={handleSubmit(onSubmit)} />
                <Text style={styles.orText}>{t('Login.orText')}</Text>
                <CommonTextButton text={t('Login.loginWithBio')} onPress={() =>
                    handleBiometricAuth()
                } />
             </View>
         </View>
        </SafeAreaView>
    );
}
