import React from 'react';
import { Button, Image, StyleSheet, SafeAreaView, View } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useSafeArea } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';

const LogoLayout = ({ children, showMenu = true, showBack = false }) => {
  const insets = useSafeArea();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View style={styles.headerControl}>
          {showMenu && !showBack && (
            <Button title="Menu" onPress={() => navigation.openDrawer()} />
          )}
          {showBack && (
            <Button title="Back" onPress={() => navigation.goBack()} />
          )}
        </View>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/logo_horizontal.png')}
          />
        </View>
        <View style={[styles.headerControl, { alignItems: 'flex-end' }]}>
          {showMenu && showBack && (
            <Button title="Menu" onPress={() => navigation.openDrawer()} />
          )}
        </View>
      </View>
      <SafeAreaView style={styles.main}>{children}</SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.OFF_WHITE,
    flex: 1,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 16,
  },
  headerControl: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    flex: 3,
  },
  logo: {
    height: 30,
    width: 105,
  },
  main: {
    flex: 1,
  },
});

export default LogoLayout;
