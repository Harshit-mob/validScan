import React, { createContext, useState, useEffect, ReactNode } from 'react';
import * as Network from 'expo-network';

// Define the shape of the context
interface NetworkStatusContextProps {
  isConnected: boolean;
}

// Create the context with a default value
export const NetworkStatusContext = createContext<NetworkStatusContextProps>({
  isConnected: true, // Default value
});

// Define props for the provider component
interface NetworkProviderProps {
  children: ReactNode;
}

const NetworkProvider: React.FC<NetworkProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  // Monitor network status using event listener and polling method
  useEffect(() => {
    // Function to check network state
    const getNetworkState = async () => {
      const state = await Network.getNetworkStateAsync();
      setIsConnected(state.isConnected ?? false);
    };

    // Initially check the network state
    getNetworkState();

    // Use event listener to listen for network state changes
    const unsubscribe = Network.addNetworkStateListener((state) => {
      setIsConnected(state.isConnected ?? false);
    });

    // Cleanup on unmount
    return () => {
      unsubscribe.remove(); // Unsubscribe from the event listener
    };
  }, []);

  return (
      <NetworkStatusContext.Provider value={{ isConnected }}>
        {children}
      </NetworkStatusContext.Provider>
  );
};

export default NetworkProvider;
