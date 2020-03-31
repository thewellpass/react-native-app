import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Locations = () => {
  return (
    <View style={styles.container}>
      <Text>My Locations</Text>
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

export default Locations;
