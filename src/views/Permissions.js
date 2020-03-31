import React, { useContext, useState } from 'react';
import { Alert, Platform, StyleSheet, Button, Text, View } from 'react-native';
import Header from '../components/Header';
import LocationPermissions from '../constants/LocationPermissions';
import Paragraph from '../components/Paragraph';
import UserContext from '../contexts/UserContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Steps = Object.freeze({
  LOCATION: 'LOCATION',
  BLUETOOTH: 'BLUETOOTH',
});

const Permissions = ({ navigation }) => {
  const { checkLocationPermissions, updateUserField } = useContext(UserContext);
  const [currentStep, setCurrentStep] = useState(Steps.LOCATION);

  const showLocationAlert = () => {
    const title = 'Location needed';
    const message =
      'When we identify health risks relevant to your locations, we alert you. Community protection needs us all to participate. Please “Allow”.';
    if (Platform.OS === 'web') {
      alert(`${title}. ${message}`);
      checkLocationPermissions();
    }
    Alert.alert('Location needed', message, [
      { text: 'Go back', onPress: () => checkLocationPermissions() },
    ]);
  };

  const handleLocationPress = async () => {
    const result = await checkLocationPermissions();
    if (result === LocationPermissions.NEVER) {
      showLocationAlert();
    } else {
      setCurrentStep(Steps.BLUETOOTH);
    }
  };

  const handleBluetoothPress = async val => {
    updateUserField('hasEnabledBluetooth', val);
    navigation.navigate('Root');
  };

  return (
    <View style={styles.container}>
      <Header>Proximity to Protect&nbsp;&amp;&nbsp;Prevent</Header>
      <Paragraph>
        WellPass uses technology in your phone to understand your proximity to
        people in order to protect you and prevent the spread of viruses such as
        COVID-19.
      </Paragraph>
      <Paragraph>
        Whether you’re there now or were last week, know when you cross paths
        with risk.
      </Paragraph>
      <View style={styles.controls}>
        {/* Icons go here */}
        {currentStep === Steps.LOCATION && (
          <>
            <Text style={styles.subheader}>Enable location sharing</Text>
            <View style={styles.button}>
              <Button
                title="Only While Using the App"
                onPress={() => handleLocationPress()}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Always Allow"
                onPress={() => handleLocationPress()}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Don't Allow"
                onPress={() => handleLocationPress()}
              />
            </View>
          </>
        )}
        {currentStep === Steps.BLUETOOTH && (
          <>
            <Text style={styles.subheader}>Enable Bluetooth</Text>
            <View style={styles.button}>
              <Button
                title="Allow"
                onPress={() => handleBluetoothPress(true)}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Don't Allow"
                onPress={() => handleBluetoothPress(false)}
              />
            </View>
          </>
        )}
        <View style={styles.stepToggles}>
          <TouchableOpacity
            style={
              currentStep === Steps.LOCATION
                ? styles.stepToggleActive
                : styles.stepToggle
            }
            onPress={() => setCurrentStep(Steps.LOCATION)}
          />
          <TouchableOpacity
            style={
              currentStep === Steps.BLUETOOTH
                ? styles.stepToggleActive
                : styles.stepToggle
            }
            onPress={() => setCurrentStep(Steps.BLUETOOTH)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  controls: {
    alignItems: 'center',
    flex: 1,
    marginTop: 40,
  },
  subheader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 24,
    textTransform: 'uppercase',
  },
  button: {
    marginBottom: 4,
  },
  stepToggles: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  stepToggle: {
    backgroundColor: 'transparent',
    borderColor: '#C1BFBF',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    height: 15,
    margin: 4,
    width: 15,
  },
  stepToggleActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    height: 15,
    margin: 4,
    width: 15,
  },
});

export default Permissions;
