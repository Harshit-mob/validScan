import React, { createContext, useContext, useState, ReactNode } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Icon, Snackbar} from 'react-native-paper';
import {DeviceTypeContext, DeviceTypeContextProps} from "./DeviceTypeProvider";
import {useAppTheme} from "../utils/theme";
import scale from "../utils/scaleResolutions";

type SnackbarType = 'success' | 'error' | 'warning' | 'info';

interface SnackbarContextProps {
    showMessage: (message: string, type: SnackbarType) => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(undefined);

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};

 const SnackbarProvider = ({ children }: { children: ReactNode }) => {
     const { colors } = useAppTheme();
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState<SnackbarType>('info');

    const { isTablet } = useContext<DeviceTypeContextProps>(DeviceTypeContext);

    const colorBG = {
        success: colors.successBG,
        error:  colors.errorBG,
        warning: colors.warningBG,
        info: colors.infoBG,
    };

    const textColor = {
        success: colors.successText,
        error:  colors.errorText,
        warning: colors.warningText,
        info: colors.infoText,
    }

    const icon = {
        success: 'check-circle-outline',
        error:  'alert-circle-outline',
        warning: 'alert-outline',
        info: 'information-outline',
    }

    const showMessage = (msg: string, msgType: SnackbarType) => {
        setMessage(msg);
        setType(msgType);
        setVisible(true);
    };

    return (
        <SnackbarContext.Provider value={{ showMessage }}>
            {children}
               <Snackbar
                    visible={visible}
                    wrapperStyle={isTablet ? styles.wrapperTabStyle : styles.wrapperMobileStyle}
                    onDismiss={() => setVisible(false)}
                    style={[
                        { backgroundColor: colorBG[type] },
                    ]}
                >
                   <View style={styles.contentView}>
                       <Icon size={scale(22)} source={icon[type]} color={textColor[type]} />
                       <Text allowFontScaling={true} style={[{color: textColor[type]}, styles.titleText]}>{message}</Text>
                   </View>
                </Snackbar>
        </SnackbarContext.Provider>
    );
};

const styles = StyleSheet.create({
    wrapperTabStyle:{
        top: 40,
        width: '20%',
        right: 20,
        flexWrap: 'wrap'
    },
    wrapperMobileStyle: {
        top: 20,
        flexWrap: 'wrap',
        width: '80%',
        alignSelf: 'center',
    },
    contentView: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    titleText: {
        fontSize: scale(16),
        lineHeight: scale(24),
        fontFamily: 'NotoSans-Regular',
        marginLeft: scale(10),
        flex: 1,
        flexWrap: 'wrap'
    }
});

export default SnackbarProvider
