import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  header: {
    color: Colors.BLACK,
    fontSize: 30,
    fontWeight: '500',
    lineHeight: 41,
    marginBottom: 8,
  },
});

const Header = ({ children, ...rest }) => {
  return (
    <Text style={styles.header} {...rest}>
      {children}
    </Text>
  );
};

export default Header;
