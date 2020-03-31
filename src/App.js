import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import About from './views/About';
import Home from './views/Home';
// import LocationPermissions from './constants/LocationPermissions';
import Permissions from './views/Permissions';
import Privacy from './views/Privacy';
import Profile from './views/Profile';
import Resources from './views/Resources';
import Share from './views/Share';
import SignUp from './views/SignUp';
import Test from './views/Test'; // For testing purposes only.
import ToS from './views/ToS';
import UserContext, { UserProvider } from './contexts/UserContext';
import HowItWorks from './views/HowItWorks';
// import useBleManager from './hooks/useBleManager';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Root = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Scanner Test***" component={Test} />
      <Drawer.Screen name="Profile & Settings" component={Profile} />
      <Drawer.Screen name="My Locations" component={Profile} />
      <Drawer.Screen name="Coronavirus Resources" component={Resources} />
      <Drawer.Screen name="Protect & Share" component={Share} />
      <Drawer.Screen name="How It Works" component={HowItWorks} />
      <Drawer.Screen name="About" component={About} />
      <Drawer.Screen name="Privacy" component={Privacy} />
      <Drawer.Screen name="Terms of Service" component={ToS} />
    </Drawer.Navigator>
  );
};

const App = () => {
  // const { deviceIds, scanAndReport } = useBleManager();
  return (
    <NavigationContainer>
      <UserProvider>
        <UserContext.Consumer>
          {({ hasInitialized, user }) => {
            if (!hasInitialized) {
              return false;
            }
            let initialRoute = 'Sign Up';
            // if (user.hasAcceptedPrivacyPolicy && user.hasAcceptedTOS) {
            //   initialRoute = 'Permissions';

            //   if (
            //     user.hasEnabledBluetooth &&
            //     user.hasEnabledLocationSharing !== LocationPermissions.NEVER
            //   ) {
            //     initialRoute = 'Root';
            //   }
            // }
            return (
              <Stack.Navigator
                initialRouteName={initialRoute}
                headerMode="none"
              >
                <Stack.Screen name="Sign Up" component={SignUp} />
                <Stack.Screen name="Permissions" component={Permissions} />
                <Stack.Screen name="Root" component={Root} />
              </Stack.Navigator>
            );
          }}
        </UserContext.Consumer>
      </UserProvider>
    </NavigationContainer>
  );
};

export default App;
