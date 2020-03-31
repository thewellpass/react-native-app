import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});

const PaddedView = ({ children, style = {}, ...rest }) => {
  return (
    <View style={[styles.container, style]} {...rest}>
      {children}
    </View>
  );
};

export default PaddedView;
