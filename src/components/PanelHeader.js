import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  header: {
    color: Colors.BLACK,
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 27,
    marginBottom: 8,
  },
});

const Header = ({ children, style = {}, ...rest }) => {
  return (
    <Text style={[styles.header, style]} {...rest}>
      {children}
    </Text>
  );
};

export default Header;
