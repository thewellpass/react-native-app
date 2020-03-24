import React from 'react';
import { StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  header: {
    color: '#1E1C61',
    fontSize: 16,
    fontWeight: 'medium',
    lineHeight: 24,
    marginBottom: 24,
  },
});

const Paragraph = ({ children, ...rest }) => {
  return (
    <Text style={styles.header} {...rest}>
      {children}
    </Text>
  );
};

export default Paragraph;
