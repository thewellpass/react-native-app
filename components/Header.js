import React from 'react';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  header: {
    color: '#1E1C61',
    fontSize: 30,
    fontWeight: 'medium',
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
