import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  header: {
    color: Colors.BLACK,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    marginBottom: 24,
  },
});

const Paragraph = ({ children, style = {}, ...rest }) => {
  return (
    <Text style={[styles.header, style]} {...rest}>
      {children}
    </Text>
  );
};

export default Paragraph;
