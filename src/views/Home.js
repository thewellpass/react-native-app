import React from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import useBleManager from './hooks/useBleManager';

const App = () => {
  const { deviceIds, startScan, stopScan, isScanning } = useBleManager();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={{ marginBottom: 16 }}>
          <Button title="Scan" onPress={() => startScan()} />
          <Button title="Stop Scan" onPress={() => stopScan()} />
          <Text> ({isScanning ? 'Scanning' : 'Idle'})</Text>
        </View>

        <View>
          <View>
            <Text>Results: {deviceIds.length}</Text>
          </View>

          {deviceIds.map(id => (
            <View>
              <Text>{`${id}`}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    width: window.width,
    height: window.height,
    padding: 16,
  },
});

export default App;
