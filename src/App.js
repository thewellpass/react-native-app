import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import useBleManager from './hooks/useBleManager';

const App = () => {
  const { deviceIds, startScan, stopScan, isScanning } = useBleManager();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={{ margin: 10 }}>
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
  },
  scroll: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f0f0f0',
    margin: 10,
  },
  row: {
    margin: 10,
  },
});

export default App;
