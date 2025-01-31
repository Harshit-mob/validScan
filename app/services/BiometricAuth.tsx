import * as LocalAuthentication from 'expo-local-authentication';

export const authenticateWithBiometrics = async () => {
    try {
        // Check if biometric authentication is available
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        if (!hasHardware) {
            return { success: false, message: "Biometric authentication is not supported on this device." };
        }
        console.log('hasHardware', hasHardware)
        // Check if biometrics are enrolled
        const enrolled = await LocalAuthentication.isEnrolledAsync();
        if (!enrolled) {
            return { success: false, message: "No biometrics found. Please enroll a fingerprint or Face ID." };
        }

        // Get the available biometric types
        const biometricTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
        let biometricMethod = "Biometric Authentication";

        if (biometricTypes.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
            biometricMethod = "Fingerprint";
        } else if (biometricTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
            biometricMethod = "Face ID";
        }

        // Authenticate user
        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: `Authenticate using ${biometricMethod}`,
            fallbackLabel: "Use Passcode",
            disableDeviceFallback: false,
            cancelLabel: "Cancel",
        });

        return { success: result.success, message: result.success ? "Authentication successful!" : "Authentication failed." };
    } catch (error) {
        return { success: false, message: "Error during authentication: " + error.message };
    }
};
