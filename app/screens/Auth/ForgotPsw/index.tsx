import {View, Text, Image } from "react-native";
import { useRouter } from "expo-router";
import {useAppTheme} from "../../../utils/theme";
import {useContext} from "react";
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
import {AppDispatch} from "../../../redux/store";
import {useSnackbar} from "../../../providers/SnakbarProvider";
import createStyles from "./styles";
import {useLoader} from "../../../providers/LoaderProvider";
import {verifyEmail} from "../../../redux/auth/forgotPswSlice";
import OutlinedTextInput from "../../../components/OutlinedTextInput";

type FormData = {
    email: string;
};

export default function ForgotPsw() {
    const { t } = useContext(TranslationContext);
    const { colors } = useAppTheme();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { showMessage } = useSnackbar();
    const { showLoader, hideLoader } = useLoader();

    const validationSchema = yup.object({
        email: yup
            .string()
            .email(t('Login.emailInvalid'))
            .required(t('Login.emailRequired')),

    });

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(validationSchema),
    });

    const styles = createStyles(colors);

    const onSubmit = async (data: FormData) => {
        try {
            showLoader();
            const response = await dispatch(verifyEmail({ email: data.email }));

            hideLoader();
            if (response.payload.status) {
                showMessage(response.payload.message, "success"); // Show success message
                router.replace(RoutesConstants.verifyOtp); // Navigate to dashboard
            } else {
                showMessage(response.payload.message || "Login failed", "error"); // Show error message
            }
        } catch (error) {
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
                        <Text style={styles.title}>{t('ForgotPsw.titleText')}</Text>
                        <Text style={styles.subTitle}>{t('ForgotPsw.subText')}</Text>
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
                            />)}
                    />

                    <CommonElevatedButton
                        text={t('ForgotPsw.verifyBtn')}
                        onPress={handleSubmit(onSubmit)}
                    />

                    <CommonTextButton
                        text={t('ForgotPsw.backToLogin')}
                        icon={'chevron-left'}
                        iconSize={scale(24)}
                        style={{marginTop: scale(20),}}
                        textStyle={{color: colors.textSecondary}}
                        onPress={() => {
                            router.replace(RoutesConstants.login)
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
