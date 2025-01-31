import {View, Text, Image} from "react-native";
import { useRouter } from "expo-router";
import {useAppTheme} from "../../../utils/theme";
import {useContext} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import scale from "../../../utils/scaleResolutions";
import Images from "../../../constants/ImageConstants";
import {TranslationContext} from "../../../providers/TransalationProvider";
import CommonElevatedButton from "../../../components/CommonElevatedButton";
import createStyles from "./styles";
import RoutesConstants from "../../../constants/RoutesConstants";
import {Icon} from "react-native-paper";

export default function Success() {
    const { t } = useContext(TranslationContext);
    const { colors } = useAppTheme();
    const router = useRouter();

    const styles = createStyles(colors);


    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.container}>
                <View style={styles.logoView}>
                    <Image source={Images.logo} style={{width: scale(400),resizeMode: 'cover'}}  />
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <View style={styles.labelView}>
                        <View style={styles.icon}>
                            <Icon size={scale(104)} color={colors.successText} source={'check-circle'} />
                        </View>
                        <Text style={styles.title}>{t('ResetPsw.pswChanged')}</Text>
                        <Text style={styles.subTitle}>{t('ResetPsw.successSubText')}</Text>
                    </View>

                    <CommonElevatedButton text={t('ResetPsw.loginNowText')} onPress={() => {
                        router.replace(RoutesConstants.login);
                    }} />

                </View>
            </View>
        </SafeAreaView>
    );
}
