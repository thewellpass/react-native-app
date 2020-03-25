import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './views/Home';
import LocationPermissions from './constants/LocationPermissions';
import Permissions from './views/Permissions';
import SignUp from './views/SignUp';
import UserContext, { UserProvider } from './contexts/UserContext';
// import useBleManager from './hooks/useBleManager';

const Stack = createStackNavigator();

const App = () => {
  // const { deviceIds, scanAndReport } = useBleManager();
  return (
    <UserProvider>
      <UserContext.Consumer>
        {({ hasInitialized, user }) => {
          if (!hasInitialized) return false;
          let initialRoute = 'Sign Up';
          if (user.hasAcceptedPrivacyPolicy && user.hasAcceptedTOS) {
            initialRoute = 'Permissions';

            if (
              user.hasEnabledBluetooth &&
              user.hasEnabledLocationSharing !== LocationPermissions.NEVER
            ) {
              initialRoute = 'Home';
            }
          }
          return (
            <NavigationContainer>
              <Stack.Navigator initialRouteName={initialRoute}>
                <Stack.Screen name="Sign Up" component={SignUp} />
                <Stack.Screen name="Permissions" component={Permissions} />
                <Stack.Screen name="Home" component={Home} />
              </Stack.Navigator>
            </NavigationContainer>
          );
        }}
      </UserContext.Consumer>
    </UserProvider>
  );
};

export default App;
