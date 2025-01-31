import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Dimensions, PixelRatio } from 'react-native';

// Define the shape of the context
export interface DeviceTypeContextProps {
    isTablet: boolean;
}

// Create the context with a default value
export const DeviceTypeContext = createContext<DeviceTypeContextProps>({
    isTablet: false, // Default value
});

// Define props for the provider component
interface DeviceTypeProviderProps {
    children: ReactNode;
}

const DeviceTypeProvider: React.FC<DeviceTypeProviderProps> = ({ children }) => {
    const [isTablet, setIsTablet] = useState<boolean>(false);

    const detectDeviceType = () => {
        const { width, height } = Dimensions.get('screen'); // Get screen width and height in DIPs
        const pixelDensity = PixelRatio.get(); // Get the pixel density of the device

        // Calculate the diagonal in DIPs (device-independent pixels)
        const diagonalInDIPs = Math.sqrt(width ** 2 + height ** 2);

        // Convert the diagonal from DIPs to pixels (device pixels)
        const diagonalInPixels = diagonalInDIPs * pixelDensity;

        // Convert the diagonal from pixels to inches
        const diagonalInInches = diagonalInPixels / (pixelDensity * 160); // 160 is a typical DPI for Android (you can adjust this for specific devices)

        console.log('Screen diagonal size (inches):', diagonalInInches);

        // Tablet threshold: Diagonal size >= 7 inches
        const isTablet = diagonalInInches >= 7;

        // Log device type
        console.log('Device Type:', isTablet ? 'Tablet' : 'Phone');

        setIsTablet(isTablet);
    };


    useEffect(() => {
        // Initial detection
        detectDeviceType();

        // Subscribe to dimension changes
        const subscription = Dimensions.addEventListener('change', detectDeviceType);

        console.log('subscription', subscription)
        // Cleanup the subscription on unmount
        return () => {
                subscription?.remove();  // Properly removes the listener
        };
    }, []);

    return (
        <DeviceTypeContext.Provider value={{ isTablet }}>
            {children}
        </DeviceTypeContext.Provider>
    );
};


export default DeviceTypeProvider;
