import React, { useContext } from 'react';
import { Button, StyleSheet, Switch, Text, View } from 'react-native';
import UserContext from '../contexts/UserContext';

const items = [
  {
    icon: null,
    title: 'Protect & Prevent',
    description: 'Notifications when risk is relevant to you',
  },
  {
    icon: null,
    title: 'Location Based Protection',
    description:
      'Allowing location services enables you to be aware wherever you go',
  },
  {
    icon: null,
    title: 'Privacy Minded',
    description:
      'You can remain anonymous. We’ll request the minimum needed to help save lives.',
  },
  {
    icon: null,
    title: 'Made with Love',
    description:
      'We are just trying to save some lives. Join and you will be too.',
  },
];

const SignUp = ({ navigation }) => {
  const { user, updateUserField } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {items.map((item) => (
          <React.Fragment key={item.title}>
            <Text style={styles.subHeader}>{item.title}</Text>
            <Text style={styles.paragraph}>{item.description}</Text>
          </React.Fragment>
        ))}
        <View style={styles.controlsContainer}>
          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxLabel}>Terms of Service</Text>
            <Switch
              onValueChange={(val) => updateUserField('hasAcceptedTOS', val)}
              value={user.hasAcceptedTOS}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxLabel}>Privacy Policy</Text>
            <Switch
              onValueChange={(val) =>
                updateUserField('hasAcceptedPrivacyPolicy', val)
              }
              value={user.hasAcceptedPrivacyPolicy}
            />
          </View>
          <Button
            disabled={!(user.hasAcceptedTOS && user.hasAcceptedPrivacyPolicy)}
            title="Start Saving Lives"
            onPress={() => navigation.navigate('Permissions')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#666',
    flex: 1,
    justifyContent: 'center',
    padding: 40,
  },
  innerContainer: {
    maxWidth: 400,
  },
  subHeader: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 19,
  },
  paragraph: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 16,
  },
  controlsContainer: {
    marginTop: 64,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  checkboxLabel: {
    color: '#fff',
    flexDirection: 'row',
  },
});

export default SignUp;
