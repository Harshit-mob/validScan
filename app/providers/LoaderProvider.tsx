// context/LoaderContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ActivityIndicator, Portal, Modal } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

interface LoaderContextType {
    showLoader: () => void;
    hideLoader: () => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

const LoaderProvider = ({ children }: { children: ReactNode }) => {
    const [visible, setVisible] = useState(false);

    const showLoader = () => setVisible(true);
    const hideLoader = () => setVisible(false);

    return (
        <LoaderContext.Provider value={{ showLoader, hideLoader }}>
            {children}
            {/* Global Loader */}
            <Portal>
                <Modal visible={visible} dismissable={false} contentContainerStyle={styles.modal}>
                    <ActivityIndicator animating={true} size="large" />
                </Modal>
            </Portal>
        </LoaderContext.Provider>
    );
};

export const useLoader = () => {
    const context = useContext(LoaderContext);
    if (!context) {
        throw new Error('useLoader must be used within a LoaderProvider');
    }
    return context;
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
});


export default LoaderProvider;
