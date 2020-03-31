import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Alerts = () => {
  return (
    <View style={styles.container}>
      <Text>Alerts</Text>
    </View>
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

export default Alerts;
