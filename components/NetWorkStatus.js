import React, { useEffect } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { Alert } from 'react-native';

const NetworkStatus = () => {
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection lost!');
      // Handle network disconnect actions here
    } else if (connectionStatus.isConnected === true) {
      // Handle network reconnect actions here
    }
  }, [connectionStatus.isConnected]);

  return null; // This component doesn't render anything visible
};

export default NetworkStatus;
