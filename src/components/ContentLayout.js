import React from 'react';
import { Button, StyleSheet, SafeAreaView, Text, View } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeArea } from 'react-native-safe-area-context';
import Colors from '../constants/Colors';

const LogoLayout = ({ children, showMenu = true, showBack = true, title }) => {
  const insets = useSafeArea();
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        {showMenu && (
          <View style={[styles.headerControl, { alignItems: 'flex-start' }]}>
            <Button title="Back" onPress={() => navigation.goBack()} />
          </View>
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title || route.name}</Text>
        </View>
        {showBack && (
          <View style={[styles.headerControl, { alignItems: 'flex-end' }]}>
            <Button title="Menu" onPress={() => navigation.openDrawer()} />
          </View>
        )}
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
    paddingHorizontal: 16,
  },
  headerControl: {
    flex: 1,
  },
  titleContainer: {
    alignItems: 'center',
    flex: 2,
  },
  title: {
    fontSize: 17,
    fontWeight: '900',
  },
  main: {
    flex: 1,
  },
});

export default LogoLayout;
