import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    //  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    padding: 12,
  },
});

const Panel = ({ children, style = {}, ...rest }) => {
  return (
    <View style={[styles.container, style]} {...rest}>
      {children}
    </View>
  );
};

export default Panel;
