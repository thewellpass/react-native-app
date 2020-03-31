import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HowItWorks = () => {
  return (
    <View style={styles.container}>
      <Text>How It Works</Text>
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

export default HowItWorks;
