import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import useBleManager from '../hooks/useBleManager';

const Home = () => {
  // the BleManager here is just for testing. This hook should be at the App.js
  // level.
  const { deviceIds, scanAndReport, status } = useBleManager();
  const [recordedDevices, setRecordedDevices] = useState([]);

  useEffect(() => {
    if (deviceIds.length) {
      setRecordedDevices(deviceIds, ...recordedDevices);
    }
  }, [deviceIds]);

  return (
    <View style={styles.container}>
      <Button onPress={scanAndReport} title="Scan" />
      <Text>{JSON.stringify(recordedDevices)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
